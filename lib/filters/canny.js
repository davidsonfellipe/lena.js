LenaJS.canny = function(pixels, args) {
  pixels = LenaJS.bigGaussian(pixels);
  var deltaX = LenaJS.sobelHorizontal(pixels);
  var deltaY = LenaJS.sobelVertical(pixels);
  var r = LenaJS.gradient(deltaX, deltaY); //Magnitude and Angle of edges
  var lp = LenaJS.laplacian(pixels); //The laplacian represent better the magnitude
  pixels = LenaJS.nonMaximumSuppression(lp, r.direction);
  return LenaJS.thresholding(pixels, 8);
};
