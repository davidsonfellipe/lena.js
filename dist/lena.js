/*
 *  lena-js - v0.2.0
 *  Library for image processing
 *  https://github.com/davidsonfellipe/lena-js/
 *
 *  Made by Davidson Fellipe
 *  Under MIT License
 */
var LenaJS = {};

LenaJS.getImage = function(img) {

  var c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;

  var ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

  return ctx.getImageData(0, 0, img.width, img.height);
};

LenaJS.printCanvas = function(selector, idata) {

  selector.width = idata.width;
  selector.height = idata.height;

  var ctx = selector.getContext('2d');
  ctx.putImageData(idata, 0, 0);

};

LenaJS.filterImage = function(selector, filter, image) {

  var args = [this.getImage(image)];

  return this.printCanvas(selector, filter.apply(null, args));
};

LenaJS.redrawCanvas = function(selector, filter) {

  var ctx = selector.getContext('2d');

  ctx = [ctx.getImageData(0, 0, selector.width, selector.height)];

  return this.printCanvas(selector, filter.apply(null, ctx));
};

LenaJS.convolution = function(pixels, weights) {
  var side = Math.round(Math.sqrt(weights.length)),
    halfSide = Math.floor(side/2),
    src = pixels.data,
    canvasWidth = pixels.width,
    canvasHeight = pixels.height,
    temporaryCanvas = document.createElement('canvas'),
    temporaryCtx = temporaryCanvas.getContext('2d'),
    outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight)

  for (var y = 0; y < canvasHeight; y++) {

    for (var x = 0; x < canvasWidth; x++) {

      var dstOff = (y * canvasWidth + x) * 4,
        sumReds = 0,
        sumGreens = 0,
        sumBlues = 0

      for (var kernelY = 0; kernelY < side; kernelY++) {
        for (var kernelX = 0; kernelX < side; kernelX++) {

          var currentKernelY = y + kernelY - halfSide,
            currentKernelX = x + kernelX - halfSide

          if (currentKernelY >= 0 &&
              currentKernelY < canvasHeight &&
              currentKernelX >= 0 &&
              currentKernelX < canvasWidth) {

            var offset = (currentKernelY * canvasWidth + currentKernelX) * 4,
              weight = weights[kernelY * side + kernelX]

            sumReds += src[offset] * weight
            sumGreens += src[offset + 1] * weight
            sumBlues += src[offset + 2] * weight
          }
        }
      }

      outputData.data[dstOff] = sumReds
      outputData.data[dstOff+1] = sumGreens
      outputData.data[dstOff+2] = sumBlues
      outputData.data[dstOff+3] = 255
    }
  }
  return outputData
}

LenaJS.gradient = function(deltaX, deltaY) {
  var srcX = deltaX.data,
    canvasWidth = deltaX.width,
    canvasHeight = deltaX.height,
    srcY = deltaY.data,
    temporaryCanvas = document.createElement('canvas'),
    temporaryCtx = temporaryCanvas.getContext('2d'),
    outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight),
    outputDataDir = new Array(srcX.length).fill(0)

  for (var y = 0; y < canvasHeight; y++) {

    for (var x = 0; x < canvasWidth; x++) {

      var dstOff = (y * canvasWidth + x) * 4

      outputData.data[dstOff] = Math.sqrt(Math.pow(srcX[dstOff], 2) +  Math.pow(srcY[dstOff], 2))
      outputData.data[dstOff+1] = Math.sqrt(Math.pow(srcX[dstOff+1], 2) +  Math.pow(srcY[dstOff+1], 2))
      outputData.data[dstOff+2] = Math.sqrt(Math.pow(srcX[dstOff+2], 2) +  Math.pow(srcY[dstOff+2], 2))
      outputData.data[dstOff+3] = 255

      outputDataDir[dstOff] = Math.atan2(srcY[dstOff], srcX[dstOff])
      outputDataDir[dstOff+1] = Math.atan2(srcY[dstOff+1], srcX[dstOff+1])
      outputDataDir[dstOff+2] = Math.atan2(srcY[dstOff+2], srcX[dstOff+2])
      outputDataDir[dstOff+3] = 255
    }
  }

  var result = {magnitude: outputData, direction: outputDataDir}

  return result
}

/*global LenaJS:false */
LenaJS.histogram = function(image) {

  'use strict'

  var pixels = this.getImage(image),
    zeroedArray = new Array(257).join('0').split('')

  var histogram = {
    r: zeroedArray.map(Number),
    g: zeroedArray.map(Number),
    b: zeroedArray.map(Number)
  }

  for (var i = 0; i < pixels.data.length; i += 4) {

    histogram.r[pixels.data[i]]++

    histogram.g[pixels.data[i + 1]]++

    histogram.b[pixels.data[i + 2]]++

  }

  return histogram
}

LenaJS.nonMaximumSuppression = function(pixels, direction) {
  var side = Math.round(Math.sqrt(25)),
    halfSide = Math.floor(side/2),
    src = pixels.data,
    canvasWidth = pixels.width,
    canvasHeight = pixels.height,
    temporaryCanvas = document.createElement('canvas'),
    temporaryCtx = temporaryCanvas.getContext('2d'),
    outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight)

  for (var y = 0; y < canvasHeight; y++) {

    for (var x = 0; x < canvasWidth; x++) {
      var dstOff = (y * canvasWidth + x) * 4,
        maxReds = src[dstOff],
        maxGreens = src[dstOff+1],
        maxBlues = src[dstOff+2]

      for (var kernelY = 0; kernelY < side; kernelY++) {
        for (var kernelX = 0; kernelX < side; kernelX++) {

          var currentKernelY = y + kernelY - halfSide,
            currentKernelX = x + kernelX - halfSide

          if (currentKernelY >= 0 &&
              currentKernelY < canvasHeight &&
              currentKernelX >= 0 &&
              currentKernelX < canvasWidth) {

            var offset = (currentKernelY * canvasWidth + currentKernelX) * 4,
              currentKernelAngle = Math.atan2(currentKernelY - y, currentKernelX -x)

            maxReds = src[offset]*Math.abs(Math.cos(direction[dstOff]-currentKernelAngle)) > maxReds ? 0 : maxReds
            maxGreens = src[offset+1]*Math.abs(Math.cos(direction[dstOff+1]-currentKernelAngle)) > maxGreens ? 0 : maxGreens
            maxBlues = src[offset+2]*Math.abs(Math.cos(direction[dstOff+2]-currentKernelAngle)) > maxBlues ? 0 : maxBlues
          }
        }
      }

      outputData.data[dstOff] = maxReds *2
      outputData.data[dstOff+1] = maxGreens *2
      outputData.data[dstOff+2] = maxBlues *2
      outputData.data[dstOff+3] = 255
    }
  }
  return outputData
}

LenaJS.bigGaussian = function(pixels) {
  var divider = 159,
    operator = [2/divider, 4/divider, 5/divider, 4/divider, 2/divider,
      4/divider, 9/divider,12/divider, 9/divider, 4/divider,
      5/divider,12/divider,15/divider,12/divider, 5/divider,
      4/divider, 9/divider,12/divider, 9/divider, 4/divider,
      2/divider, 4/divider, 5/divider, 4/divider, 2/divider]

  return LenaJS.convolution(pixels, operator)
}

LenaJS.canny = function(pixels) {
  pixels = LenaJS.bigGaussian(pixels)
  var deltaX = LenaJS.sobelHorizontal(pixels)
  var deltaY = LenaJS.sobelVertical(pixels)
  var r = LenaJS.gradient(deltaX, deltaY) //Magnitude and Angle of edges
  var lp = LenaJS.laplacian(pixels) //The laplacian represent better the magnitude

  pixels = LenaJS.nonMaximumSuppression(lp, r.direction)

  return LenaJS.thresholding(pixels, 8)
}

LenaJS.gaussian = function(pixels) {
  var divider = 16,
    operator = [1/divider, 2/divider, 1/divider,
      2/divider, 4/divider, 2/divider,
      1/divider, 2/divider, 1/divider]

  return LenaJS.convolution(pixels, operator)
}

LenaJS.grayscale = function(pixels) {
  for (var i = 0; i < pixels.data.length; i += 4) {
    var r = pixels.data[i],
      g = pixels.data[i+1],
      b = pixels.data[i+2]

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = 0.2126*r + 0.7152*g + 0.0722*b
  }

  return pixels
}

LenaJS.highpass = function(pixels) {
  var operator = [-1, -1, -1,
    -1,  8, -1,
    -1, -1, -1]

  return LenaJS.convolution(pixels, operator)
}

LenaJS.invert = function(pixels) {
  for (var i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = 255 - pixels.data[i]
    pixels.data[i+1] = 255 - pixels.data[i+1]
    pixels.data[i+2] = 255 - pixels.data[i+2]
  }

  return pixels
}

LenaJS.laplacian = function(pixels) {
  var operator = [ 0, -1, 0,
    -1, 4, -1,
    0, -1, 0 ]

  return LenaJS.convolution(pixels, operator)
}

LenaJS.lowpass3 = function(pixels) {
  var k = 1/9
  var operator = [ k, k, k,
    k, k, k,
    k, k, k]

  return LenaJS.convolution(pixels, operator)
}

LenaJS.lowpass5 = function(pixels) {
  var k = 1/25

  var operator = [ k, k, k, k, k,
    k, k, k, k, k,
    k, k, k, k, k,
    k ,k, k, k, k,
    k ,k, k, k, k]

  return LenaJS.convolution(pixels, operator)
}

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

LenaJS.prewittHorizontal = function(pixels) {
  var divider = 3

  var operator = [1/divider, 1/divider, 1/divider,
    0, 0, 0,
    -1/divider, -1/divider, -1/divider]

  return LenaJS.convolution(pixels, operator)
}

LenaJS.prewittVertical = function(pixels) {
  var divider = 3

  var operator = [-1/divider, 0, 1/divider,
    -1/divider, 0, 1/divider,
    -1/divider, 0, 1/divider]

  return LenaJS.convolution(pixels, operator)
}

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

LenaJS.roberts = function(pixels) {
  var operator = [0, 0, 0,
    1, -1, 0,
    0, 0, 0]

  return LenaJS.convolution(pixels, operator)
}

LenaJS.saturation = function(pixels) {
  var level = 2.9,
    RW = 0.3086,
    RG = 0.6084,
    RB = 0.0820,
    RW0 = (1 - level) * RW + level,
    RW1 = (1 - level) * RW,
    RW2 = (1 - level) * RW,
    RG0 = (1 - level) * RG,
    RG1 = (1 - level) * RG + level,
    RG2 = (1 - level) * RG,
    RB0 = (1 - level) * RB,
    RB1 = (1 - level) * RB,
    RB2 = (1 - level) * RB + level

  for (var i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i]   = RW0*pixels.data[i] + RG0*pixels.data[i+1] + RB0*pixels.data[i+2]
    pixels.data[i+1] = RW1*pixels.data[i] + RG1*pixels.data[i+1] + RB1*pixels.data[i+2]
    pixels.data[i+2] = RW2*pixels.data[i] + RG2*pixels.data[i+1] + RB2*pixels.data[i+2]
  }

  return pixels
}

LenaJS.sepia = function(pixels) {
  for (var i = 0; i < pixels.data.length; i += 4) {
    var r = pixels.data[i],
      g = pixels.data[i+1],
      b = pixels.data[i+2]

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = 0.3*r + 0.59*g + 0.11*b

    pixels.data[i] += 40
    pixels.data[i+1] += 20
    pixels.data[i+2] -= 20
  }

  return pixels
}

LenaJS.sharpen = function(pixels) {
  var operator = [0, -0.2, 0,
    -0.2, 1.8, -0.2,
    0, -0.2, 0]

  return LenaJS.convolution(pixels, operator)
}

LenaJS.sobelHorizontal = function(pixels) {
  var divider = 4,
    operator = [ 1/divider, 2/divider, 1/divider,
      0, 0, 0,
      -1/divider, -2/divider, -1/divider ]

  pixels = LenaJS.convolution(pixels, operator)

  return pixels
}

LenaJS.sobelVertical = function(pixels) {
  var divider = 4,
    operator = [ 1/divider, 0, -1/divider,
      2/divider, 0, -2/divider,
      1/divider, 0, -1/divider ]

  pixels = LenaJS.convolution(pixels, operator)

  return pixels
}

LenaJS.thresholding = function(pixels, args) {
  for (var i = 0; i < pixels.data.length; i += 4) {
    var r = pixels.data[i],
      g = pixels.data[i+1],
      b = pixels.data[i+2]

    var v = 0.2126*r + 0.7152*g + 0.0722*b
    var thr = args || 128

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = v > thr ? 255 : 0
  }

  return pixels
}
