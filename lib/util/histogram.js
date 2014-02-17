/*global LenaJS:false */
LenaJS.histogram = function(image) {

  'use strict';

  var pixels = this.getImage(image),
    zeroedArray = new Array(257).join('0').split('');

  var histogram = {
    r: zeroedArray.map(Number),
    g: zeroedArray.map(Number),
    b: zeroedArray.map(Number)
  };

  for (var i = 0; i < pixels.data.length; i += 4) {

    histogram.r[pixels.data[i]]++;

    histogram.g[pixels.data[i + 1]]++;

    histogram.b[pixels.data[i + 2]]++;

  }

  return histogram;
};
