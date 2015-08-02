LenaJS.lowpass3 = function(pixels, args) {
  var k = 1/9;
  var operator = [ k, k, k,
                   k, k, k,
                   k, k, k];

  return LenaJS.convolution(pixels, operator);
};
