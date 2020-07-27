const mirror = function (pixels) {
  let tmp = []
  const width = pixels.width * 4

  for (let h = 0; h < pixels.height; h++) {
    let offset = h * width
    let middle = pixels.width / 2

    for (let w = 0; w < middle; w++) {
      let pos = w * 4
      let pxl = pos + offset
      let lastPxl = width - pos - 4 + offset

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

export default mirror
