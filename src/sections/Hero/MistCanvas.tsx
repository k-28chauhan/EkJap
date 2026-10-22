import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from '@/lib/gsap'
import fragment from './mist.frag.glsl?raw'
import type { MistState } from './mistState'

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// fog-300 and mist-50 from the palette, as 0..1 RGB
const FOG = [185 / 255, 189 / 255, 180 / 255]
const PALE = [243 / 255, 240 / 255, 233 / 255]

const mix = (a: number, b: number, t: number) => a + (b - a) * t

interface MistCanvasProps {
  state: RefObject<MistState>
  /** The element whose visibility pauses the loop */
  watch: RefObject<HTMLElement | null>
  /** Draw at this fraction of CSS size and stretch with CSS (0.6 desktop, lower on phones) */
  scale: number
  onUnavailable: () => void
}

/**
 * The hero's front fog (EKJAP_PLAN.md §7.3): one full-screen OGL fragment shader,
 * domain-warped fractal noise concentrated in a band over the wordmark. Rendered at
 * reduced resolution, paused while the hero is off-screen, and driven entirely by
 * the shared MistState that the hero timelines tween.
 */
export function MistCanvas({ state, watch, scale, onUnavailable }: MistCanvasProps) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = host.current
    if (!container) return

    let renderer: Renderer
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.25),
      })
    } catch {
      onUnavailable()
      return
    }
    const gl = renderer.gl
    if (!gl) {
      onUnavailable()
      return
    }

    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.display = 'block'
    container.appendChild(canvas)

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uMouse: { value: [0, 0] },
        uDensity: { value: 0.55 },
        uColor: { value: FOG },
        uBandCenter: { value: 0.3 },
        uBandWidth: { value: 0.28 },
        uFadeIn: { value: 1 },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      renderer.setSize(container.clientWidth * scale, container.clientHeight * scale)
      // Stretch the small drawing buffer over the full area
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      program.uniforms.uResolution.value = [canvas.width, canvas.height]
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    let visible = true
    const intersection = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    if (watch.current) intersection.observe(watch.current)

    const tick = (time: number) => {
      const s = state.current
      if (!visible || !s) return
      const u = program.uniforms
      u.uTime.value = time
      u.uMouse.value = [s.mouseX, s.mouseY]
      // The scroll-out thickens the fog, spreads the band over the screen and turns it pale
      u.uDensity.value = mix(s.density, 1, s.out)
      u.uFadeIn.value = s.fade
      u.uBandCenter.value = mix(s.bandCenter, 0.5, s.out)
      u.uBandWidth.value = mix(s.bandWidth, 1.1, s.out)
      u.uColor.value = FOG.map((channel, i) => mix(channel, PALE[i], s.out))
      renderer.render({ scene: mesh })
    }
    gsap.ticker.add(tick)

    const lost = (event: Event) => {
      event.preventDefault()
      onUnavailable()
    }
    canvas.addEventListener('webglcontextlost', lost)

    return () => {
      gsap.ticker.remove(tick)
      intersection.disconnect()
      resizeObserver.disconnect()
      canvas.removeEventListener('webglcontextlost', lost)
      canvas.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [state, watch, scale, onUnavailable])

  return <div ref={host} aria-hidden className="pointer-events-none absolute inset-0" />
}
