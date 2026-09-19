export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function prefersFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
