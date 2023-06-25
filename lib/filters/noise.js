const noise = function (pixels, amount = 0) {
  const level = amount * 255 * 0.1
  let random

  for (let i = 0; i < pixels.data.length; i += 4) {
    random = (0.5 - Math.random()) * level

    pixels.data[i] += random
    pixels.data[i + 1] += random
    pixels.data[i + 2] += random
  }

  return pixels
}

export default noise
