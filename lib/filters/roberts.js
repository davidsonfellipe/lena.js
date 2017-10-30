LenaJS.roberts = function(pixels) {
  var operator = [0, 0, 0,
    1, -1, 0,
    0, 0, 0]

  return LenaJS.convolution(pixels, operator)
}
