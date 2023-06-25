/**
 * Apply a blue filter to the image by setting red and green channels to 0.
 * @param {ImageData} pixels - The pixel data of the image.
 * @returns {ImageData} - The modified pixel data.
 */
const blue = function (pixels) {
  const data = pixels.data

  // set red and green channels to 0
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0
    data[i + 1] = 0
  }

  return pixels
}

export default blue
