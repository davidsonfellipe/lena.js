LenaJS.thresholding = function(pixels, args) {

  var data = pixels.data;

  for (var i = 0; i < data.length; i += 4) {

    var r = data[i],
        g = data[i+1],
        b = data[i+2];

    var v = 0.2126*r + 0.7152*g + 0.0722*b;

    data[i] = data[i+1] = data[i+2] = v > 128 ? 255 : 0;
  }

  return pixels;
};