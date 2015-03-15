LenaJS.highpass = function(pixels, args) {

  var operator = [-1, -1, -1,
                  -1,  8, -1,
                  -1, -1, -1];

  return LenaJS.convolution(pixels, operator);
};
