import convolution from '../operations/convolution'

const highpass = function (pixels) {
  const operator = [-1, -1, -1, -1, 8, -1, -1, -1, -1]

  return convolution(pixels, operator)
}

export default highpass
