import convolution from '../operations/convolution'

const sobelHorizontal = function (pixels) {
  const divider = 4
  const operator = [1 / divider, 2 / divider, 1 / divider, 0, 0, 0, -1 / divider, -2 / divider, -1 / divider]

  pixels = convolution(pixels, operator)

  return pixels
}

export default sobelHorizontal
