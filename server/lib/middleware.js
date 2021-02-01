/**
 * Middleware that validates email and logs a request to the database
 * @param {NoSQL} db - an instantiated NoSQL db
 */
module.exports = (db) => {
  return (req, res, next) => {
    // Try and validate the email. Send a 400 back to the user if it doesn't validate
    try {
      validateEmail(req.headers['x-user'])
    } catch (err) {
      next(err)
    }
    // Get some of the important parts of the request for logging
    const { rawHeaders, url, method, body, params } = req
    db.addRequestLogging({
      email: req.headers['x-user'],
      timestamp: Date.now(),
      rawHeaders,
      url,
      method,
      body,
      params
    })
    // Call next even if there is an issue with the request logging.
    next()
  }
}
// very simple email validation. Could expand into an indepth regex style validation if necessary
const validateEmail = (string) => {
  // Error if required values left off
  if (!string) throw new Error('Must include x-user as a header')
  // Make sure that there is an @ and . that follows at somepoint
  if (string.lastIndexOf('.') &&
      string.indexOf('@') > 0 &&
      string.lastIndexOf('.') > string.indexOf('@') > 0) {
    return true
  } else {
    throw new Error('x-user must be a valid email')
  }
}
