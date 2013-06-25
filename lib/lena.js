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

    var args = document.getElementById('canvas');

    var ctx = args.getContext("2d");

    ctx = [ctx.getImageData(0, 0, 400, 400)];

    return this.printCanvas(selector, filter.apply(null, ctx));
};