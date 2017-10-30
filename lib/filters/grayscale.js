LenaJS.grayscale = function(pixels) {
  for (var i = 0; i < pixels.data.length; i += 4) {
    var r = pixels.data[i],
      g = pixels.data[i+1],
      b = pixels.data[i+2]

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = 0.2126*r + 0.7152*g + 0.0722*b
  }

  return pixels
}
