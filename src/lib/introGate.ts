/**
 * The hero's intro (and the nav's) waits for this gate. The preloader opens it as
 * it lifts away; if the preloader is skipped (repeat visit, reduced motion) the
 * app opens it straight away. Opening is idempotent.
 */
let open!: () => void
export const introGate = new Promise<void>((resolve) => {
  open = resolve
})
export const openIntroGate = () => open()
