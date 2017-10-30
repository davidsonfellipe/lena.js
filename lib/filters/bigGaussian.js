LenaJS.bigGaussian = function(pixels) {
  var divider = 159,
    operator = [2/divider, 4/divider, 5/divider, 4/divider, 2/divider,
      4/divider, 9/divider,12/divider, 9/divider, 4/divider,
      5/divider,12/divider,15/divider,12/divider, 5/divider,
      4/divider, 9/divider,12/divider, 9/divider, 4/divider,
      2/divider, 4/divider, 5/divider, 4/divider, 2/divider]

  return LenaJS.convolution(pixels, operator)
}
