
/*
 *  lena.js - 0.6.0
 *  Library for image processing <https://github.com/davidsonfellipe/lena-js/>
 *
 *  Made by Davidson Fellipe.
 *  Released under MIT License
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const invert = function (pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = 255 - pixels.data[i];
    pixels.data[i + 1] = 255 - pixels.data[i + 1];
    pixels.data[i + 2] = 255 - pixels.data[i + 2];
  }

  return pixels
};

const contrast = function (pixels, amount) {
  const level = Math.pow((amount + 100) / 100, 2);

  let data = pixels.data;
  let r;
  let g;
  let b;

  for (let i = 0; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];

    r = r / 255;
    r -= 0.5;
    r *= level;
    r += 0.5;
    r *= 255;

    g = g / 255;
    g -= 0.5;
    g *= level;
    g += 0.5;
    g *= 255;

    b = b / 255;
    b -= 0.5;
    b *= level;
    b += 0.5;
    b *= 255;

    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  return pixels
};

const mirror = function (pixels) {
  let tmp = [];
  const width = pixels.width * 4;

  for (let h = 0; h < pixels.height; h++) {
    let offset = h * width;
    let middle = pixels.width / 2;

    for (let w = 0; w < middle; w++) {
      let pos = w * 4;
      let pxl = pos + offset;
      let lastPxl = width - pos - 4 + offset;

      tmp[0] = pixels.data[pxl];
      tmp[1] = pixels.data[pxl + 1];
      tmp[2] = pixels.data[pxl + 2];
      tmp[3] = pixels.data[pxl + 3];

      pixels.data[pxl] = pixels.data[lastPxl];
      pixels.data[pxl + 1] = pixels.data[lastPxl + 1];
      pixels.data[pxl + 2] = pixels.data[lastPxl + 2];
      pixels.data[pxl + 3] = pixels.data[lastPxl + 3];

      pixels.data[lastPxl] = tmp[0];
      pixels.data[lastPxl + 1] = tmp[1];
      pixels.data[lastPxl + 2] = tmp[2];
      pixels.data[lastPxl + 3] = tmp[3];
    }
  }

  return pixels
};

const red = function (pixels) {
  let d = pixels.data;

  for (let i = 0; i < d.length; i += 4) {
    d[i] = d[i];
    d[i + 1] = 0;
    d[i + 2] = 0;
  }

  return pixels
};

const green = function (pixels) {
  let d = pixels.data;

  for (let i = 0; i < d.length; i += 4) {
    d[i] = 0;
    d[i + 2] = 0;
  }

  return pixels
};

const blue = function (pixels) {
  let d = pixels.data;

  for (let i = 0; i < d.length; i += 4) {
    d[i] = 0;
    d[i + 1] = 0;
  }

  return pixels
};

const truncate = function (sum) {
  if (sum < 0) {
    return 0
  } else if (sum > 255) {
    return 255
  } else {
    return sum
  }
};

const brightness = function (pixels, amount = 0) {
  let { data } = pixels;
  const level = Math.floor(255 * (amount / 100));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = truncate(data[i] + level);
    data[i + 1] = truncate(data[i + 1] + level);
    data[i + 2] = truncate(data[i + 2] + level);
  }

  return pixels
};

const sepia = function (pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    let r = pixels.data[i],
      g = pixels.data[i + 1],
      b = pixels.data[i + 2];

    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 0.3 * r + 0.59 * g + 0.11 * b;

    pixels.data[i] += 40;
    pixels.data[i + 1] += 20;
    pixels.data[i + 2] -= 20;
  }

  return pixels
};

const saturation = function (pixels) {
  const level = 2.9,
    RW = 0.3086,
    RG = 0.6084,
    RB = 0.082,
    RW0 = (1 - level) * RW + level,
    RW1 = (1 - level) * RW,
    RW2 = (1 - level) * RW,
    RG0 = (1 - level) * RG,
    RG1 = (1 - level) * RG + level,
    RG2 = (1 - level) * RG,
    RB0 = (1 - level) * RB,
    RB1 = (1 - level) * RB,
    RB2 = (1 - level) * RB + level;

  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = RW0 * pixels.data[i] + RG0 * pixels.data[i + 1] + RB0 * pixels.data[i + 2];
    pixels.data[i + 1] = RW1 * pixels.data[i] + RG1 * pixels.data[i + 1] + RB1 * pixels.data[i + 2];
    pixels.data[i + 2] = RW2 * pixels.data[i] + RG2 * pixels.data[i + 1] + RB2 * pixels.data[i + 2];
  }

  return pixels
};

const thresholding = function (pixels, amount = 128) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    let r = pixels.data[i],
      g = pixels.data[i + 1],
      b = pixels.data[i + 2];

    let v = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = v > amount ? 255 : 0;
  }

  return pixels
};

const grayscale = function (pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    let r = pixels.data[i];
    let g = pixels.data[i + 1];
    let b = pixels.data[i + 2];

    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  return pixels
};

const noise = function (pixels, amount = 0) {
  var level = amount * 255 * 0.1;
  let random;

  for (let i = 0; i < pixels.data.length; i += 4) {
    random = (0.5 - Math.random()) * level;

    pixels.data[i] += random;
    pixels.data[i + 1] += random;
    pixels.data[i + 2] += random;
  }

  return pixels
};

const convolution = function (pixels, weights) {
  let side = Math.round(Math.sqrt(weights.length)),
    halfSide = Math.floor(side / 2),
    src = pixels.data,
    canvasWidth = pixels.width,
    canvasHeight = pixels.height,
    temporaryCanvas = document.createElement('canvas'),
    temporaryCtx = temporaryCanvas.getContext('2d'),
    outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight);

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      let dstOff = (y * canvasWidth + x) * 4,
        sumReds = 0,
        sumGreens = 0,
        sumBlues = 0;

      for (let kernelY = 0; kernelY < side; kernelY++) {
        for (let kernelX = 0; kernelX < side; kernelX++) {
          let currentKernelY = y + kernelY - halfSide,
            currentKernelX = x + kernelX - halfSide;

          if (
            currentKernelY >= 0 &&
            currentKernelY < canvasHeight &&
            currentKernelX >= 0 &&
            currentKernelX < canvasWidth
          ) {
            let offset = (currentKernelY * canvasWidth + currentKernelX) * 4,
              weight = weights[kernelY * side + kernelX];

            sumReds += src[offset] * weight;
            sumGreens += src[offset + 1] * weight;
            sumBlues += src[offset + 2] * weight;
          }
        }
      }

      outputData.data[dstOff] = sumReds;
      outputData.data[dstOff + 1] = sumGreens;
      outputData.data[dstOff + 2] = sumBlues;
      outputData.data[dstOff + 3] = 255;
    }
  }
  return outputData
};

const roberts = function (pixels) {
  const operator = [0, 0, 0, 1, -1, 0, 0, 0, 0];

  return convolution(pixels, operator)
};

const lowpass3 = function (pixels) {
  const k = 1 / 9;
  const operator = [k, k, k, k, k, k, k, k, k];

  return convolution(pixels, operator)
};

const lowpass5 = function (pixels) {
  const k = 1 / 25;
  const operator = [k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k];

  return convolution(pixels, operator)
};

const highpass = function (pixels) {
  const operator = [-1, -1, -1, -1, 8, -1, -1, -1, -1];

  return convolution(pixels, operator)
};

const laplacian = function (pixels) {
  const operator = [0, -1, 0, -1, 4, -1, 0, -1, 0];

  return convolution(pixels, operator)
};

const prewittVertical = function (pixels) {
  const divider = 3;
  const operator = [-1 / divider, 0, 1 / divider, -1 / divider, 0, 1 / divider, -1 / divider, 0, 1 / divider];

  return convolution(pixels, operator)
};

const prewittHorizontal = function (pixels) {
  const divider = 3;
  const operator = [1 / divider, 1 / divider, 1 / divider, 0, 0, 0, -1 / divider, -1 / divider, -1 / divider];

  return convolution(pixels, operator)
};

const sharpen = function (pixels) {
  const operator = [0, -0.2, 0, -0.2, 1.8, -0.2, 0, -0.2, 0];

  return convolution(pixels, operator)
};

const sobelVertical = function (pixels) {
  const divider = 4;
  const operator = [1 / divider, 0, -1 / divider, 2 / divider, 0, -2 / divider, 1 / divider, 0, -1 / divider];

  pixels = convolution(pixels, operator);

  return pixels
};

const sobelHorizontal = function (pixels) {
  const divider = 4;
  const operator = [1 / divider, 2 / divider, 1 / divider, 0, 0, 0, -1 / divider, -2 / divider, -1 / divider];

  pixels = convolution(pixels, operator);

  return pixels
};

const gaussian = function (pixels) {
  const divider = 16;
  const operator = [
    1 / divider,
    2 / divider,
    1 / divider,
    2 / divider,
    4 / divider,
    2 / divider,
    1 / divider,
    2 / divider,
    1 / divider,
  ];

  return convolution(pixels, operator)
};

const bigGaussian = function (pixels) {
  const divider = 159;
  const operator = [
    2 / divider,
    4 / divider,
    5 / divider,
    4 / divider,
    2 / divider,
    4 / divider,
    9 / divider,
    12 / divider,
    9 / divider,
    4 / divider,
    5 / divider,
    12 / divider,
    15 / divider,
    12 / divider,
    5 / divider,
    4 / divider,
    9 / divider,
    12 / divider,
    9 / divider,
    4 / divider,
    2 / divider,
    4 / divider,
    5 / divider,
    4 / divider,
    2 / divider,
  ];

  return convolution(pixels, operator)
};

const gradient = function (deltaX, deltaY) {
  let srcX = deltaX.data,
    canvasWidth = deltaX.width,
    canvasHeight = deltaX.height,
    srcY = deltaY.data,
    temporaryCanvas = document.createElement('canvas'),
    temporaryCtx = temporaryCanvas.getContext('2d'),
    outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight),
    outputDataDir = new Array(srcX.length).fill(0);

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      let dstOff = (y * canvasWidth + x) * 4;

      outputData.data[dstOff] = Math.sqrt(Math.pow(srcX[dstOff], 2) + Math.pow(srcY[dstOff], 2));
      outputData.data[dstOff + 1] = Math.sqrt(Math.pow(srcX[dstOff + 1], 2) + Math.pow(srcY[dstOff + 1], 2));
      outputData.data[dstOff + 2] = Math.sqrt(Math.pow(srcX[dstOff + 2], 2) + Math.pow(srcY[dstOff + 2], 2));
      outputData.data[dstOff + 3] = 255;

      outputDataDir[dstOff] = Math.atan2(srcY[dstOff], srcX[dstOff]);
      outputDataDir[dstOff + 1] = Math.atan2(srcY[dstOff + 1], srcX[dstOff + 1]);
      outputDataDir[dstOff + 2] = Math.atan2(srcY[dstOff + 2], srcX[dstOff + 2]);
      outputDataDir[dstOff + 3] = 255;
    }
  }

  let result = { magnitude: outputData, direction: outputDataDir };

  return result
};

const nonMaximumSuppression = function (pixels, direction) {
  let side = Math.round(Math.sqrt(25)),
    halfSide = Math.floor(side / 2),
    src = pixels.data,
    canvasWidth = pixels.width,
    canvasHeight = pixels.height,
    temporaryCanvas = document.createElement('canvas'),
    temporaryCtx = temporaryCanvas.getContext('2d'),
    outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight);

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      let dstOff = (y * canvasWidth + x) * 4,
        maxReds = src[dstOff],
        maxGreens = src[dstOff + 1],
        maxBlues = src[dstOff + 2];

      for (let kernelY = 0; kernelY < side; kernelY++) {
        for (let kernelX = 0; kernelX < side; kernelX++) {
          let currentKernelY = y + kernelY - halfSide,
            currentKernelX = x + kernelX - halfSide;

          if (
            currentKernelY >= 0 &&
            currentKernelY < canvasHeight &&
            currentKernelX >= 0 &&
            currentKernelX < canvasWidth
          ) {
            let offset = (currentKernelY * canvasWidth + currentKernelX) * 4,
              currentKernelAngle = Math.atan2(currentKernelY - y, currentKernelX - x);

            maxReds = src[offset] * Math.abs(Math.cos(direction[dstOff] - currentKernelAngle)) > maxReds ? 0 : maxReds;
            maxGreens =
              src[offset + 1] * Math.abs(Math.cos(direction[dstOff + 1] - currentKernelAngle)) > maxGreens
                ? 0
                : maxGreens;
            maxBlues =
              src[offset + 2] * Math.abs(Math.cos(direction[dstOff + 2] - currentKernelAngle)) > maxBlues ? 0 : maxBlues;
          }
        }
      }

      outputData.data[dstOff] = maxReds * 2;
      outputData.data[dstOff + 1] = maxGreens * 2;
      outputData.data[dstOff + 2] = maxBlues * 2;
      outputData.data[dstOff + 3] = 255;
    }
  }
  return outputData
};

const canny = function (pixels) {
  pixels = bigGaussian(pixels);
  const deltaX = sobelHorizontal(pixels);
  const deltaY = sobelVertical(pixels);
  const r = gradient(deltaX, deltaY); //Magnitude and Angle of edges
  const lp = laplacian(pixels); //The laplacian represent better the magnitude

  pixels = nonMaximumSuppression(lp, r.direction);

  return thresholding(pixels, 8)
};

const printCanvas = function (selector, idata) {
  selector.width = idata.width;
  selector.height = idata.height;

  const ctx = selector.getContext('2d');
  ctx.putImageData(idata, 0, 0);
};

const getImage = function (img) {
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;

  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);

  return ctx.getImageData(0, 0, img.width, img.height)
};

const filterImage = function (selector, filter, image, amount = 0) {
  let args = [getImage(image), amount];
  return printCanvas(selector, filter.apply(null, args))
};

const redrawCanvas = function (selector, filter) {
  let ctx = selector.getContext('2d');

  ctx = [ctx.getImageData(0, 0, selector.width, selector.height)];

  return printCanvas(selector, filter.apply(null, ctx))
};

const histogram = function (image) {
  const pixels = this.getImage(image),
    zeroedArray = new Array(257).join('0').split('');

  let histogramTemp = {
    r: zeroedArray.map(Number),
    g: zeroedArray.map(Number),
    b: zeroedArray.map(Number),
  };

  for (let i = 0; i < pixels.data.length; i += 4) {
    histogramTemp.r[pixels.data[i]]++;
    histogramTemp.g[pixels.data[i + 1]]++;
    histogramTemp.b[pixels.data[i + 2]]++;
  }

  return histogramTemp
};

exports.bigGaussian = bigGaussian;
exports.blue = blue;
exports.brightness = brightness;
exports.canny = canny;
exports.contrast = contrast;
exports.filterImage = filterImage;
exports.gaussian = gaussian;
exports.getImage = getImage;
exports.grayscale = grayscale;
exports.green = green;
exports.highpass = highpass;
exports.histogram = histogram;
exports.invert = invert;
exports.laplacian = laplacian;
exports.lowpass3 = lowpass3;
exports.lowpass5 = lowpass5;
exports.mirror = mirror;
exports.noise = noise;
exports.prewittHorizontal = prewittHorizontal;
exports.prewittVertical = prewittVertical;
exports.printCanvas = printCanvas;
exports.red = red;
exports.redrawCanvas = redrawCanvas;
exports.roberts = roberts;
exports.saturation = saturation;
exports.sepia = sepia;
exports.sharpen = sharpen;
exports.sobelHorizontal = sobelHorizontal;
exports.sobelVertical = sobelVertical;
exports.thresholding = thresholding;
