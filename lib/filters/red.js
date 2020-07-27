const red = function (pixels) {
  let d = pixels.data

  for (let i = 0; i < d.length; i += 4) {
    d[i] = d[i]
    d[i + 1] = 0
    d[i + 2] = 0
  }

  return pixels
}

export default red
