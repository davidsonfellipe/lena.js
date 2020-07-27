import convolution from '../operations/convolution'

const prewittHorizontal = function (pixels) {
  const divider = 3
  const operator = [1 / divider, 1 / divider, 1 / divider, 0, 0, 0, -1 / divider, -1 / divider, -1 / divider]

  return convolution(pixels, operator)
}

export default prewittHorizontal
