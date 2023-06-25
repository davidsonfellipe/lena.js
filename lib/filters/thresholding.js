/**
 * Apply thresholding to the pixel data of an image.
 * @param {ImageData} pixels - The pixel data of the image.
 * @param {number} [amount=128] - The threshold value.
 * @returns {ImageData} - The modified pixel data.
 */
const thresholding = function (pixels, amount = 128) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const r = pixels.data[i]
    const g = pixels.data[i + 1]
    const b = pixels.data[i + 2]

    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b

    const newValue = v > amount ? 255 : 0

    pixels.data[i] = newValue
    pixels.data[i + 1] = newValue
    pixels.data[i + 2] = newValue
  }

  return pixels
}

export default thresholding
