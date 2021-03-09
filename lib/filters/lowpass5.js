import convolution from '../operations/convolution'

const lowpass5 = function (pixels) {
  const size = 25;
  const operator = Array(size).fill(1/size);

  return convolution(pixels, operator)
}

export default lowpass5
