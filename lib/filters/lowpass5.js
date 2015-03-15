LenaJS.lowpass5 = function(pixels, args) {
  var k = 1/25;

 var operator = [ k, k, k, k, k,
                  k, k, k, k, k,
                  k, k, k, k, k,
                  k ,k, k, k, k,
                  k ,k, k, k, k];

  return LenaJS.convolution(pixels, operator);
};
