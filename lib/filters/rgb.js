LenaJS.red = function(pixels) {
  var d = pixels.data

  for (var i = 0; i < d.length; i += 4) {
    d[i] = d[i]
    d[i+1] = 0
    d[i+2] = 0
  }

  return pixels
}

LenaJS.green = function(pixels) {
  var d = pixels.data

  for (var i = 0; i < d.length; i += 4) {
    d[i] = 0
    d[i+2] = 0
  }

  return pixels
}

LenaJS.blue = function(pixels) {
  var d = pixels.data

  for (var i = 0; i < d.length; i += 4) {
    d[i] = 0
    d[i+1] = 0
  }

  return pixels
}
