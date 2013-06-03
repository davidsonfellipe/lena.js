/*
 *  lena-js - v0.0.1
 *  Library for image processing
 *  https://github.com/davidsonfellipe/lena-js/
 *
 *  Made by Davidson Fellipe
 *  Under MIT License
 */
LenaJS = {};

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
LenaJS.grayscale = function(pixels, args) {

  for (var i = 0; i < pixels.data.length; i += 4) {

    var r = pixels.data[i],
        g = pixels.data[i+1],
        b = pixels.data[i+2];

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = 0.2126*r + 0.7152*g + 0.0722*b;

  }

  return pixels;
};
LenaJS.invert = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    var r = d[i],
        g = d[i+1],
        b = d[i+2];

    d[i] = 255 - d[i];
    d[i+1] = 255 - d[i+1];
    d[i+2] = 255 - d[i+2];
  }

  return pixels;
};

LenaJS.red = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    var r = d[i],
        g = d[i+1],
        b = d[i+2];

    d[i] = d[i];
    d[i+1] = 0;
    d[i+2] = 0;
  }

  return pixels;
};

LenaJS.green = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    var r = d[i],
        g = d[i+1],
        b = d[i+2];

    d[i] = 0;
    d[i+2] = 0;
  }

  return pixels;
};

LenaJS.blue = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    var r = d[i],
        g = d[i+1],
        b = d[i+2];

    d[i] = 0;
    d[i+1] = 0;
  }

  return pixels;
};
LenaJS.saturation = function(pixels, args) {

    var amount = 2.9;
    var RW = 0.3086;
    var RG = 0.6084;
    var RB = 0.0820;
    var RW0 = (1 - amount) * RW + amount;
    var RW1 = (1 - amount) * RW;
    var RW2 = (1 - amount) * RW;
    var RG0 = (1 - amount) * RG;
    var RG1 = (1 - amount) * RG + amount;
    var RG2 = (1 - amount) * RG;
    var RB0 = (1 - amount) * RB;
    var RB1 = (1 - amount) * RB;
    var RB2 = (1 - amount) * RB + amount;

    for (var i = 0; i < pixels.data.length; i += 4) {

       pixels.data[i]   = RW0*pixels.data[i] + RG0*pixels.data[i+1] + RB0*pixels.data[i+2];
       pixels.data[i+1] = RW1*pixels.data[i] + RG1*pixels.data[i+1] + RB1*pixels.data[i+2];
       pixels.data[i+2] = RW2*pixels.data[i] + RG2*pixels.data[i+1] + RB2*pixels.data[i+2];

    }

    return pixels;
};
LenaJS.sepia = function(pixels, args) {

  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    var r = d[i],
        g = d[i+1],
        b = d[i+2];

    var v = 0.3*r + 0.59*g + 0.11*b;

    d[i] = d[i+1] = d[i+2] = v;

    d[i] += 40;
    d[i+1] += 20;
    d[i+2] -= 20;
  }

  return pixels;
};
LenaJS.thresholding = function(pixels, args) {

  var data = pixels.data;

  for (var i = 0; i < data.length; i += 4) {

    var r = data[i],
        g = data[i+1],
        b = data[i+2];

    var v = 0.2126*r + 0.7152*g + 0.0722*b;

    data[i] = data[i+1] = data[i+2] = v > 128 ? 255 : 0;
  }

  return pixels;
};