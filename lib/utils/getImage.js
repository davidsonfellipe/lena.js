const getImage = function (img) {
  const c = document.createElement('canvas')
  c.width = img.width
  c.height = img.height

  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)

  return ctx.getImageData(0, 0, img.width, img.height)
}

export default getImage
