import getImage from './getImage'

const histogram = function (image) {
  const pixels = this.getImage(image),
    zeroedArray = new Array(257).join('0').split('')

  let histogramTemp = {
    r: zeroedArray.map(Number),
    g: zeroedArray.map(Number),
    b: zeroedArray.map(Number),
  }

  for (let i = 0; i < pixels.data.length; i += 4) {
    histogramTemp.r[pixels.data[i]]++
    histogramTemp.g[pixels.data[i + 1]]++
    histogramTemp.b[pixels.data[i + 2]]++
  }

  return histogramTemp
}

export default histogram
