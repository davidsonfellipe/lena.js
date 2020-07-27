const sepia = function (pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    let r = pixels.data[i],
      g = pixels.data[i + 1],
      b = pixels.data[i + 2]

    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 0.3 * r + 0.59 * g + 0.11 * b

    pixels.data[i] += 40
    pixels.data[i + 1] += 20
    pixels.data[i + 2] -= 20
  }

  return pixels
}

export default sepia
