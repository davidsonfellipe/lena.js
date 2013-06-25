LenaJS.sepia = function(pixels, args) {
  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    var r = d[i],
        g = d[i+1],
        b = d[i+2];

    var v = 0.3*r + 0.59*g + 0.11*b;

    d[i] = d[i+1] = d[i+2] = v;

    d[i] += 40;
    d[i+1] += 20;
    d[i+2] -= 20;
  }

  return pixels;
};