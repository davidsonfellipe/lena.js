LenaJS.invert = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    var r = d[i],
        g = d[i+1],
        b = d[i+2];

    d[i] = 255 - d[i];
    d[i+1] = 255 - d[i+1];
    d[i+2] = 255 - d[i+2];
  }

  return pixels;
};