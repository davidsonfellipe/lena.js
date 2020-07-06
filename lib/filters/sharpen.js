LenaJS.sharpen = function (pixels) {
  var operator = [0, -0.2, 0, -0.2, 1.8, -0.2, 0, -0.2, 0]

  return LenaJS.convolution(pixels, operator)
}
