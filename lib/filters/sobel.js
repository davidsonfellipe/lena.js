// http://en.wikipedia.org/wiki/Sobel_operator

LenaJS.sobelHorizontal = function(pixels, args) {

  var divider = 4,
      operator = [ 1/divider, 2/divider, 1/divider,
                  0, 0, 0,
                  -1/divider, -2/divider, -1/divider ],
      pixels = LenaJS.convolution(pixels, operator);

  return pixels;
};

LenaJS.sobelVertical = function(pixels, args) {

  var divider = 4,
      operator = [ 1/divider, 0, -1/divider,
                  2/divider, 0, -2/divider,
                  1/divider, 0, -1/divider ],
      pixels = LenaJS.convolution(pixels, operator);

  return pixels;
};