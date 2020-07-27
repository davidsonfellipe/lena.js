import convolution from '../operations/convolution'

const laplacian = function (pixels) {
  const operator = [0, -1, 0, -1, 4, -1, 0, -1, 0]

  return convolution(pixels, operator)
}

export default laplacian
