import convolution from '../operations/convolution'

const lowpass5 = function (pixels) {
  const k = 1 / 25
  const operator = [k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k]

  return convolution(pixels, operator)
}

export default lowpass5
