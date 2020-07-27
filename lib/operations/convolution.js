const convolution = function (pixels, weights) {
  let side = Math.round(Math.sqrt(weights.length)),
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
        sumReds = 0,
        sumGreens = 0,
        sumBlues = 0

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
              weight = weights[kernelY * side + kernelX]

            sumReds += src[offset] * weight
            sumGreens += src[offset + 1] * weight
            sumBlues += src[offset + 2] * weight
          }
        }
      }

      outputData.data[dstOff] = sumReds
      outputData.data[dstOff + 1] = sumGreens
      outputData.data[dstOff + 2] = sumBlues
      outputData.data[dstOff + 3] = 255
    }
  }
  return outputData
}

export default convolution
