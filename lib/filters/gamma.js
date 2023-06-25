const gamma = function (pixels) {
  let k_gamma = 1.3
  var table = new Array(256)
  for (var i = table.length - 1; i >= 0; i--) {
    table[i] = parseInt((i / 255) ** k_gamma * 255)
  }

  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = table[pixels.data[i]]
    pixels.data[i + 1] = table[pixels.data[i + 1]]
    pixels.data[i + 2] = table[pixels.data[i + 2]]
  }

  return pixels
}

export default gamma
