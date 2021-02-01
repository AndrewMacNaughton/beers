const Punk = require('./PunkClient.js')
const cache = require('memory-cache')

/**
 * Do all business logic in here
 */

class PunkModel {
  constructor (baseURL) {
    const url = baseURL || 'https://api.punkapi.com/v2/beers'
    this.client = new Punk(url)
  }

  /**
   * Gets the beers from PUNK. Allow user to pass as many params in as they require.
   * @param {object} params - The query params that are used by the Punk API @link https://punkapi.com/documentation/v2
   * @param {string} params.beer_name - The beer name to search for
   * @param {string} params.ids - the ids to search for seperated as such 1|2|3
   * @param {Boolean} bypassCache - Pass true to bypass cache and hit Punk API no matter what
   * @param {Promise<object[]>} A promise that resolves to an array of objects
   */
  get (params, bypassCache) {
    // There are 2 ways to access cached. Both on on Id and beer name. It will only match if it is a single id.
    // This would need more indepth work to make it very useful
    if (!bypassCache) {
      // Don't use cache if there are multipleId. You could check to see if all Ids are present in the cache if you wanted to expand on this.
      if (params.ids && params.ids.split('|').length === 1) {
        const cachedBeer = cache.get(params.ids.split('|')[0])
        // Return if the beer is cached
        if (cachedBeer) return Promise.resolve([cachedBeer])
      }
      if (params.beer_name) {
        // Match on exact name only. Could likely try and find partial matches in cache if need be, but then end users might miss other beers with similar names
        const cachedBeer = cache.get(params.beer_name.toLowerCase())
        if (cachedBeer) return Promise.resolve([cachedBeer])
      }
    }

    // Only use this if the cache doesnt fire

    return this.client.get(params).then((beers) => {
      return beers.map((beer) => {
        const { id, name, description, first_brewed, food_pairing, image_url } = beer
        const beerToReturn = { id, name, description, imageUrl: image_url, firstBrewed: first_brewed, foodPairing: food_pairing }
        // Store it in cache as both the id & name. This might get memory intensive and would need investigation prior to production
        cache.put(beerToReturn.id, beerToReturn)
        cache.put(beerToReturn.name.toLowerCase(), beerToReturn)
        return beerToReturn
      })
    })
  }

  getAverageRating (beer, ratings) {
    if (ratings.length > 0) {
      const sumRatings = ratings.map((beer) => beer.rating).reduce((prev, curr) => prev + curr)
      return sumRatings / ratings.length
    } else {
      return 0
    }
  }
}
module.exports = PunkModel
