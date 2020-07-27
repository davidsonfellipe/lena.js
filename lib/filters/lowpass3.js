import convolution from '../operations/convolution'

const lowpass3 = function (pixels) {
  const k = 1 / 9
  const operator = [k, k, k, k, k, k, k, k, k]

  return convolution(pixels, operator)
}

export default lowpass3
