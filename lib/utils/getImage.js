const getImage = function (img) {
  var c = document.createElement('canvas')
  c.width = img.width
  c.height = img.height

  var ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)

  return ctx.getImageData(0, 0, img.width, img.height)
}

export default getImage
