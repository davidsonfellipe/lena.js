const contrast = function (pixels, amount) {
  const level = Math.pow((amount + 100) / 100, 2)

  let data = pixels.data
  let r
  let g
  let b

  for (let i = 0; i < data.length; i += 4) {
    r = data[i]
    g = data[i + 1]
    b = data[i + 2]

    r = r / 255
    r -= 0.5
    r *= level
    r += 0.5
    r *= 255

    g = g / 255
    g -= 0.5
    g *= level
    g += 0.5
    g *= 255

    b = b / 255
    b -= 0.5
    b *= level
    b += 0.5
    b *= 255

    r = r < 0 ? 0 : r > 255 ? 255 : r
    g = g < 0 ? 0 : g > 255 ? 255 : g
    b = b < 0 ? 0 : b > 255 ? 255 : b

    data[i] = r
    data[i + 1] = g
    data[i + 2] = b
  }

  return pixels
}

export default contrast
