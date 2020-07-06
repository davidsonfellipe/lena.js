LenaJS.laplacian = function (pixels) {
  var operator = [0, -1, 0, -1, 4, -1, 0, -1, 0]

  return LenaJS.convolution(pixels, operator)
}
