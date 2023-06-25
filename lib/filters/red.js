/**
 * Apply a red filter to the image by setting green and blue channels to 0.
 * @param {ImageData} pixels - The pixel data of the image.
 * @returns {ImageData} - The modified pixel data.
 */
const red = function (pixels) {
  const data = pixels.data

  // set green and blue channels to 0
  for (let i = 0; i < data.length; i += 4) {
    data[i + 1] = 0
    data[i + 2] = 0
  }

  return pixels
}

export default red
