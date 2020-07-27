const truncate = function (sum) {
  if (sum < 0) {
    return 0
  } else if (sum > 255) {
    return 255
  } else {
    return sum
  }
}

const brightness = function (pixels, amount = 0) {
  let { data } = pixels
  const level = Math.floor(255 * (amount / 100))

  for (let i = 0; i < data.length; i += 4) {
    data[i] = truncate(data[i] + level)
    data[i + 1] = truncate(data[i + 1] + level)
    data[i + 2] = truncate(data[i + 2] + level)
  }

  return pixels
}

export default brightness
