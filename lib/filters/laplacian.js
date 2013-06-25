// http://en.wikipedia.org/wiki/Laplace_operator

LenaJS.laplacian = function(pixels, args) {

  var operator = [ 0, -1, 0,
                  -1, 4, -1,
                  0, -1, 0 ];

  return LenaJS.convolution(pixels, operator);
};