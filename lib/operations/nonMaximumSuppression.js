const nonMaximumSuppression = function (pixels, direction) {
  let side = Math.round(Math.sqrt(25)),
    halfSide = Math.floor(side / 2),
    src = pixels.data,
    canvasWidth = pixels.width,
    canvasHeight = pixels.height,
    temporaryCanvas = document.createElement('canvas'),
    temporaryCtx = temporaryCanvas.getContext('2d'),
    outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight)

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      let dstOff = (y * canvasWidth + x) * 4,
        maxReds = src[dstOff],
        maxGreens = src[dstOff + 1],
        maxBlues = src[dstOff + 2]

      for (let kernelY = 0; kernelY < side; kernelY++) {
        for (let kernelX = 0; kernelX < side; kernelX++) {
          let currentKernelY = y + kernelY - halfSide,
            currentKernelX = x + kernelX - halfSide

          if (
            currentKernelY >= 0 &&
            currentKernelY < canvasHeight &&
            currentKernelX >= 0 &&
            currentKernelX < canvasWidth
          ) {
            let offset = (currentKernelY * canvasWidth + currentKernelX) * 4,
              currentKernelAngle = Math.atan2(currentKernelY - y, currentKernelX - x)

            maxReds = src[offset] * Math.abs(Math.cos(direction[dstOff] - currentKernelAngle)) > maxReds ? 0 : maxReds
            maxGreens =
              src[offset + 1] * Math.abs(Math.cos(direction[dstOff + 1] - currentKernelAngle)) > maxGreens
                ? 0
                : maxGreens
            maxBlues =
              src[offset + 2] * Math.abs(Math.cos(direction[dstOff + 2] - currentKernelAngle)) > maxBlues ? 0 : maxBlues
          }
        }
      }

      outputData.data[dstOff] = maxReds * 2
      outputData.data[dstOff + 1] = maxGreens * 2
      outputData.data[dstOff + 2] = maxBlues * 2
      outputData.data[dstOff + 3] = 255
    }
  }
  return outputData
}

export default nonMaximumSuppression
