LenaJS = {};

LenaJS.getImage = function(img) {

  var c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;

  var ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

  return ctx.getImageData(0, 0, img.width, img.height);
};

LenaJS.filterImage = function(filter, image, var_args) {

  var args = [this.getImage(image)];

  for (var i = 2; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return filter.apply(null, args);
};