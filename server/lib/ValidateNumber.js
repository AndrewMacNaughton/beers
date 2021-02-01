/**
 * A function to check whether a number or string is convertible to a number and whether it is between 0 and 5
 * @param {string|number} number
 */
module.exports = (number) => {
  // Bail out if not convertible to a number
  if (isNaN(parseInt(number))) {
    throw new Error('Rating was not a number')
  }
  // Convert to number
  const rating = Number(number)
  // Check between 0 and 5
  if (!isBetween(rating, 0, 5)) {
    throw new Error('Rating Must be between 0-5')
  }
  return rating
}

const isBetween = (value, min, max) => {
  return value >= min && value <= max
}
