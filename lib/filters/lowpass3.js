import convolution from '../operations/convolution'

const lowpass3 = function (pixels) {
  const size = 9;
  const operator = Array(size).fill(1/size);

  return convolution(pixels, operator)
}

export default lowpass3
