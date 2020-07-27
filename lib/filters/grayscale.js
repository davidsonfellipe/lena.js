const grayscale = function (pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    let r = pixels.data[i]
    let g = pixels.data[i + 1]
    let b = pixels.data[i + 2]

    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  return pixels
}

export default grayscale
