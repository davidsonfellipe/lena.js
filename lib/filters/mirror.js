LenaJS.mirror = function(pixels) {
  var tmp = []
  var width = (pixels.width * 4)

  for (var h = 0; h < pixels.height; h++) {
    var offset = h * width
    var middle = pixels.width / 2

    for (var w = 0; w < middle; w++) {
      var pos = w * 4
      var pxl = pos + offset
      var lastPxl = width - pos - 4 + offset

      tmp[0] = pixels.data[pxl]
      tmp[1] = pixels.data[pxl + 1]
      tmp[2] = pixels.data[pxl + 2]
      tmp[3] = pixels.data[pxl + 3]

      pixels.data[pxl] = pixels.data[lastPxl]
      pixels.data[pxl + 1] = pixels.data[lastPxl + 1]
      pixels.data[pxl + 2] = pixels.data[lastPxl + 2]
      pixels.data[pxl + 3] = pixels.data[lastPxl + 3]

      pixels.data[lastPxl] = tmp[0]
      pixels.data[lastPxl + 1] = tmp[1]
      pixels.data[lastPxl + 2] = tmp[2]
      pixels.data[lastPxl + 3] = tmp[3]
    }
  }

  return pixels
}
