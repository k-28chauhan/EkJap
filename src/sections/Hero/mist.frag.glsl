precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uDensity;
uniform vec3 uColor;
uniform float uBandCenter;
uniform float uBandWidth;
uniform float uFadeIn;

varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Five octaves of value noise
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(vUv.x * aspect, vUv.y);

  // The cursor pushes the fog a little
  p += uMouse * 0.06;

  float t = uTime;

  // Domain warp: a slow, large swirl bends the sampling coordinates
  vec2 q = vec2(
    fbm(p * 1.4 + vec2(t * 0.020, 0.0)),
    fbm(p * 1.4 + vec2(5.2, 1.3) - vec2(0.0, t * 0.016))
  );

  // Two layers of fog at different scales and speeds
  float broad = fbm(p * 1.7 + 2.2 * q + vec2(t * 0.045, 0.0));
  float wisps = fbm(p * 3.6 + 1.6 * q - vec2(t * 0.075, t * 0.010));
  float n = mix(broad, wisps, 0.42);
  n = smoothstep(0.30, 0.82, n);

  // Concentrate the fog in a horizontal band, soft at both edges
  float d = abs(vUv.y - uBandCenter) / max(uBandWidth, 0.0001);
  float band = 1.0 - smoothstep(0.0, 1.0, d);
  band = pow(band, 1.15);

  // Cap the alpha so the letters stay legible at resting density
  float a = clamp(n * band * uDensity * 0.78 * uFadeIn, 0.0, 0.92);

  // Premultiplied alpha
  gl_FragColor = vec4(uColor * a, a);
}
