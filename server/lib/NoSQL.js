
const SQL = require('nosql')

class NoSQL {
  constructor () {
    this.ratings = SQL.load('./data/ratings.nosql')
    this.requests = SQL.load('./data/requests.nosql')
  }

  /**
   * @callback insertCallback
   * @param {Error} err - Returns null on success
  */

  /**
   * Add a beer rating
   * @param {object} params
   * @param {string} params.beerId - the id of beer to add the rating too
   * @param {string} params.comments -
   * @param {number} params.rating - the rating to give the beer
   * @param {insertCallback} callback -  the callback to execute after insertion
   */
  addRating (params, callback) {
    return this.ratings.insert(params).callback(callback)
  }

  getAllRatings (callback) {
    return this.ratings.find().callback(callback)
  }

  /**
   * Logs important information to the database
   * @param {*} params
   */
  addRequestLogging (params) {
    return this.requests.insert(params).callback((err) => {
      // Log errors with this to the server console and notify someone
      if (err)console.error(err)
    })
  }
}
module.exports = NoSQL
