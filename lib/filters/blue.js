const blue = function (pixels) {
  let d = pixels.data

  for (let i = 0; i < d.length; i += 4) {
    d[i] = 0
    d[i + 1] = 0
  }

  return pixels
}

export default blue
