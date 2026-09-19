export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function prefersFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function canPinHero({
  width,
  height,
  contentHeight,
}: {
  width: number
  height: number
  contentHeight: number
}) {
  return width >= 1024 && contentHeight <= height
}
