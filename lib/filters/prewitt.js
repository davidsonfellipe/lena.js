// http://en.wikipedia.org/wiki/Prewitt_operator

LenaJS.prewittHorizontal = function(pixels, args) {

  var divider = 3;

  var operator = [1/divider, 1/divider, 1/divider,
                  0, 0, 0,
                  -1/divider, -1/divider, -1/divider];

  return LenaJS.convolution(pixels, operator);
};

LenaJS.prewittVertical = function(pixels, args) {

  var divider = 3;

  var operator = [-1/divider, 0, 1/divider,
                  -1/divider, 0, 1/divider,
                  -1/divider, 0, 1/divider];

  return LenaJS.convolution(pixels, operator);
};