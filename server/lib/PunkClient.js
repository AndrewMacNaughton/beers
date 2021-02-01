const axios = require('axios')

/**
 * Does all the leg work to get data from the API
 */
class PunkClient {
  constructor (baseURL) {
    this.client = axios.create({
      baseURL
    })
    // Set up an Axios interceptor to handle error
    this.client.interceptors.response.use((response) => response,
      (error) => {
      // Can expand on this to provide better reasons why this called failed to return to client
        if (error.message.includes('ENOTFOUND')) return Promise.reject(new Error('Unable to connect to downstream service, please try again later'))
        // Add some logic here to handle backoff and the ratelimiting.
        return Promise.reject(error)
      })
  }

  /**
   * Gets the beers from PUNK. Allow user to pass as many params in as they require.
   * @param {object} params - The query params that are used by the Punk API @link https://punkapi.com/documentation/v2
   * @returns {Promise<Object[]>} Returns an array of beers from the API
   */
  async get (params) {
    return this.client.get('', { params }).then((response) => response.data)
  }
}
module.exports = PunkClient
