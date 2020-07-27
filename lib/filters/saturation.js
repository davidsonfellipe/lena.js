const saturation = function (pixels) {
  const level = 2.9,
    RW = 0.3086,
    RG = 0.6084,
    RB = 0.082,
    RW0 = (1 - level) * RW + level,
    RW1 = (1 - level) * RW,
    RW2 = (1 - level) * RW,
    RG0 = (1 - level) * RG,
    RG1 = (1 - level) * RG + level,
    RG2 = (1 - level) * RG,
    RB0 = (1 - level) * RB,
    RB1 = (1 - level) * RB,
    RB2 = (1 - level) * RB + level

  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = RW0 * pixels.data[i] + RG0 * pixels.data[i + 1] + RB0 * pixels.data[i + 2]
    pixels.data[i + 1] = RW1 * pixels.data[i] + RG1 * pixels.data[i + 1] + RB1 * pixels.data[i + 2]
    pixels.data[i + 2] = RW2 * pixels.data[i] + RG2 * pixels.data[i + 1] + RB2 * pixels.data[i + 2]
  }

  return pixels
}

export default saturation
