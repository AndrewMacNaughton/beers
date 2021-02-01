import axios from 'axios'

class Client {
  /**
   * Pass in the baseURL for the API client.
   * Would pass the email
   * @param {string} baseURL
   * @param {string} user - the email of the user
   */
  constructor (baseURL, user) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        'x-user': 'test@test.com'
      }
    })
  }

  async get (url, params) {
    return this.client.get(url, { params }).then(res => res.data).catch(err => {
      return Promise.reject(new Error(err.response.data.error))
    })
  }

  async post (url, params) {
    return this.client.post(url, params).catch(err => {
      return Promise.reject(new Error(err.response.data.error))
    })
  }
}
export default Client
