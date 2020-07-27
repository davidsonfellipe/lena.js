const invert = function (pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = 255 - pixels.data[i]
    pixels.data[i + 1] = 255 - pixels.data[i + 1]
    pixels.data[i + 2] = 255 - pixels.data[i + 2]
  }

  return pixels
}

export default invert
