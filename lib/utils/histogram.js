import getImage from './getImage'

const histogram = function (image) {
  const pixels = getImage(image);

  let histogramTemp = {
    r: Array(257).fill(0),
    g: Array(257).fill(0),
    b: Array(257).fill(0),
  }

  for (let i = 0; i < pixels.data.length; i += 4) {
    histogramTemp.r[pixels.data[i]]++
    histogramTemp.g[pixels.data[i + 1]]++
    histogramTemp.b[pixels.data[i + 2]]++
  }

  return histogramTemp
}

export default histogram
