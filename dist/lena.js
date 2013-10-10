/*
 *  lena-js - v0.0.1
 *  Library for image processing
 *  https://github.com/davidsonfellipe/lena-js/
 *
 *  Made by Davidson Fellipe
 *  Under MIT License
 */
// http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/

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
      outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight);

  for (var y = 0; y < canvasHeight; y++) {

    for (var x = 0; x < canvasWidth; x++) {

      var dstOff = (y * canvasWidth + x) * 4,
          sumReds = 0,
          sumGreens = 0,
          sumBlues = 0,
          sumAlphas = 0;

      for (var kernelY = 0; kernelY < side; kernelY++) {
        for (var kernelX = 0; kernelX < side; kernelX++) {

          var currentKernelY = y + kernelY - halfSide,
              currentKernelX = x + kernelX - halfSide;

          if (currentKernelY >= 0 &&
              currentKernelY < canvasHeight &&
              currentKernelX >= 0 &&
              currentKernelX < canvasWidth) {

            var offset = (currentKernelY * canvasWidth + currentKernelX) * 4,
                weight = weights[kernelY * side + kernelX];

            sumReds += src[offset] * weight;
            sumGreens += src[offset + 1] * weight;
            sumBlues += src[offset + 2] * weight;
          }
        }
      }

      outputData.data[dstOff] = sumReds;
      outputData.data[dstOff+1] = sumGreens;
      outputData.data[dstOff+2] = sumBlues;
      outputData.data[dstOff+3] = 255;
    }
  }
  return outputData;
};
LenaJS.histogram = function(image) {

    var pixels = this.getImage(image),
        zeroedArray = Array(257).join('0').split('');

    var histogram = {r: zeroedArray.map(Number),
                     g: zeroedArray.map(Number),
                     b: zeroedArray.map(Number)};

    for (var i = 0; i < pixels.data.length; i += 4) {

        histogram.r[pixels.data[i]]++;

        histogram.g[pixels.data[i+1]]++;

        histogram.b[pixels.data[i+2]]++;

    }

    return histogram;
};
LenaJS.gaussian = function(pixels, args) {

  var divider = 16,
      operator = [1/divider, 2/divider, 1/divider,
                  2/divider, 4/divider, 2/divider,
                  1/divider, 2/divider, 1/divider];

  return LenaJS.convolution(pixels, operator);
};
// http://rosettacode.org/wiki/Grayscale_image

LenaJS.grayscale = function(pixels, args) {

  for (var i = 0; i < pixels.data.length; i += 4) {

    var r = pixels.data[i],
        g = pixels.data[i+1],
        b = pixels.data[i+2];

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = 0.2126*r + 0.7152*g + 0.0722*b;

  }

  return pixels;
};
LenaJS.highpass = function(pixels, args) {

  var operator = [-1, -1, -1,
                  -1,  8, -1,
                  -1, -1, -1];

  return LenaJS.convolution(pixels, operator);
};
LenaJS.invert = function(pixels, args) {

  for (var i = 0; i < pixels.data.length; i += 4) {

    pixels.data[i] = 255 - pixels.data[i];
    pixels.data[i+1] = 255 - pixels.data[i+1];
    pixels.data[i+2] = 255 - pixels.data[i+2];

  }

  return pixels;
};
// http://en.wikipedia.org/wiki/Laplace_operator

LenaJS.laplacian = function(pixels, args) {

  var operator = [ 0, -1, 0,
                  -1, 4, -1,
                  0, -1, 0 ];

  return LenaJS.convolution(pixels, operator);
};
// http://en.wikipedia.org/wiki/Prewitt_operator

LenaJS.prewittHorizontal = function(pixels, args) {

  var divider = 3;

  var operator = [1/divider, 1/divider, 1/divider,
                  0, 0, 0,
                  -1/divider, -1/divider, -1/divider];

  return LenaJS.convolution(pixels, operator);
};

LenaJS.prewittVertical = function(pixels, args) {

  var divider = 3;

  var operator = [-1/divider, 0, 1/divider,
                  -1/divider, 0, 1/divider,
                  -1/divider, 0, 1/divider];

  return LenaJS.convolution(pixels, operator);
};
LenaJS.red = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    d[i] = d[i];
    d[i+1] = 0;
    d[i+2] = 0;
  }

  return pixels;
};

LenaJS.green = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    d[i] = 0;
    d[i+2] = 0;
  }

  return pixels;
};

LenaJS.blue = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    d[i] = 0;
    d[i+1] = 0;
  }

  return pixels;
};
LenaJS.roberts = function(pixels, args) {

  var operator = [0, 0, 0,
                  1, -1, 0,
                  0, 0, 0];

  return LenaJS.convolution(pixels, operator);
};
/*
    Ref: http://tams-www.informatik.uni-hamburg.de/applets/hades/webdemos/00-intro/02-imageprocessing/saturation.html
*/
LenaJS.saturation = function(pixels, args) {

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
        RB2 = (1 - level) * RB + level;

    for (var i = 0; i < pixels.data.length; i += 4) {

       pixels.data[i]   = RW0*pixels.data[i] + RG0*pixels.data[i+1] + RB0*pixels.data[i+2];
       pixels.data[i+1] = RW1*pixels.data[i] + RG1*pixels.data[i+1] + RB1*pixels.data[i+2];
       pixels.data[i+2] = RW2*pixels.data[i] + RG2*pixels.data[i+1] + RB2*pixels.data[i+2];

    }

    return pixels;
};
LenaJS.sepia = function(pixels, args) {

  for (var i = 0; i < pixels.data.length; i += 4) {

    var r = pixels.data[i],
        g = pixels.data[i+1],
        b = pixels.data[i+2];

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = 0.3*r + 0.59*g + 0.11*b;

    pixels.data[i] += 40;
    pixels.data[i+1] += 20;
    pixels.data[i+2] -= 20;
  }

  return pixels;
};
LenaJS.sharpen = function(pixels, args) {

  var operator = [0, -0.2, 0,
                  -0.2, 1.8, -0.2,
                  0, -0.2, 0];

  return LenaJS.convolution(pixels, operator);
};
// http://en.wikipedia.org/wiki/Sobel_operator

LenaJS.sobelHorizontal = function(pixels, args) {

  var divider = 4,
      operator = [ 1/divider, 2/divider, 1/divider,
                  0, 0, 0,
                  -1/divider, -2/divider, -1/divider ],
      pixels = LenaJS.convolution(pixels, operator);

  return pixels;
};

LenaJS.sobelVertical = function(pixels, args) {

  var divider = 4,
      operator = [ 1/divider, 0, -1/divider,
                  2/divider, 0, -2/divider,
                  1/divider, 0, -1/divider ],
      pixels = LenaJS.convolution(pixels, operator);

  return pixels;
};
LenaJS.thresholding = function(pixels, args) {

  for (var i = 0; i < pixels.data.length; i += 4) {

    var r = pixels.data[i],
        g = pixels.data[i+1],
        b = pixels.data[i+2];

    var v = 0.2126*r + 0.7152*g + 0.0722*b;

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = v > 128 ? 255 : 0;
  }

  return pixels;
};