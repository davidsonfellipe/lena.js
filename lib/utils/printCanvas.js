const printCanvas = function (selector, idata) {
  selector.width = idata.width
  selector.height = idata.height

  const ctx = selector.getContext('2d')
  ctx.putImageData(idata, 0, 0)
}

export default printCanvas
