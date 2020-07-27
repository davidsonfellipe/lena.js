import convolution from '../operations/convolution'

const gaussian = function (pixels) {
  const divider = 16
  const operator = [
    1 / divider,
    2 / divider,
    1 / divider,
    2 / divider,
    4 / divider,
    2 / divider,
    1 / divider,
    2 / divider,
    1 / divider,
  ]

  return convolution(pixels, operator)
}

export default gaussian
