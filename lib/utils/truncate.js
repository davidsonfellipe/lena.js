const truncate = function (sum) {
  if (sum < 0) {
    return 0
  } else if (sum > 255) {
    return 255
  } else {
    return sum
  }
}

export default truncate
