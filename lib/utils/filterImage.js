import getImage from './getImage'
import printCanvas from './printCanvas'

const filterImage = function (selector, filter, image, amount = 0) {
  var args = [getImage(image), amount]
  return printCanvas(selector, filter.apply(null, args))
}

export default filterImage
