interface Rect {
  left: number
  top: number
  width: number
  height: number
}

export function computeTilt(
  mouseX: number,
  mouseY: number,
  rect: Rect,
  maxDeg: number = 6
): { rotateX: number; rotateY: number } {
  const px = (mouseX - rect.left) / rect.width - 0.5
  const py = (mouseY - rect.top) / rect.height - 0.5
  return {
    // `|| 0` normalizes -0 to 0 (e.g. dead-center cursor) so toEqual({rotateX: 0}) matches
    rotateX: -py * 2 * maxDeg || 0,
    rotateY: px * 2 * maxDeg || 0,
  }
}
