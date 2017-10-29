LenaJS.gaussian = function(pixels, args) {

  var divider = 16,
      operator = [1/divider, 2/divider, 1/divider,
                  2/divider, 4/divider, 2/divider,
                  1/divider, 2/divider, 1/divider];

  return LenaJS.convolution(pixels, operator);
};
