/**
 * Apply a pixelation filter to the image.
 * @param {ImageData} pixels - The pixel data of the image.
 * @param {number} amount - The size of each pixelation block.
 * @returns {ImageData} - The modified pixel data.
 */
const pixelate = function (pixels, amount = 4) {
  const data = pixels.data
  const width = pixels.width
  const height = pixels.height

  for (let y = 0; y < height; y += amount) {
    for (let x = 0; x < width; x += amount) {
      let r = 0
      let g = 0
      let b = 0

      const pixelsInBlock = amount * amount

      for (let offsetY = 0; offsetY < amount; offsetY++) {
        for (let offsetX = 0; offsetX < amount; offsetX++) {
          const pixelIndex = ((y + offsetY) * width + (x + offsetX)) * 4
          r += data[pixelIndex]
          g += data[pixelIndex + 1]
          b += data[pixelIndex + 2]
        }
      }

      const averageR = Math.round(r / pixelsInBlock)
      const averageG = Math.round(g / pixelsInBlock)
      const averageB = Math.round(b / pixelsInBlock)

      for (let offsetY = 0; offsetY < amount; offsetY++) {
        for (let offsetX = 0; offsetX < amount; offsetX++) {
          const pixelIndex = ((y + offsetY) * width + (x + offsetX)) * 4
          data[pixelIndex] = averageR
          data[pixelIndex + 1] = averageG
          data[pixelIndex + 2] = averageB
        }
      }
    }
  }

  return pixels
}

export default pixelate
