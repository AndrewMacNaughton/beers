import Vue from 'vue'
import Vuex from 'vuex'
import Client from './../lib/client'
const client = new Client('http://localhost:10001/v1/')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
    currentBeer: {},
    showLoading: false,
    errorHandlers: {
      errors: [],
      successes: []
    }

  },
  mutations: {
    SETBEERS: (state, beers) => {
      state.beers = beers
    },
    SETBEER: (state, beer) => {
      state.currentBeer = beer
    },
    SHOWLOADING: (state, value) => {
      state.showLoading = value
    },
    ERROR: (state, message) => {
      console.log(message)
      state.errorHandlers.errors = [message, ...state.errorHandlers.errors]
    },
    SUCCESS: (state, message) => {
      state.errorHandlers.successes = [message, ...state.errorHandlers.successes]
    }
  },
  actions: {
    // Get all the beers from the API and commit them to the store
    getBeers: async ({ commit, dispatch }, params) => {
      try {
        commit('SHOWLOADING', true)
        const beers = await client.get('beers', params)
        commit('SETBEERS', beers)
        commit('SHOWLOADING', false)
      } catch (err) {
        // Throw an error which is displayed to the user
        dispatch('error', err)
        commit('SHOWLOADING', false)
      }
    },
    // Get a single beer and set it to the Store as the current beer
    getBeer: async ({ commit, dispatch }, id) => {
      try {
        commit('SHOWLOADING', true)
        const beer = await client.get('beers', { ids: id })
        commit('SETBEER', beer[0])
        commit('SHOWLOADING', false)
      } catch (err) {
        dispatch('error', err)
        commit('SHOWLOADING', false)
      }
    },
    // Sets the passed id as the current beer. Used for navigation purposes
    setBeerAsCurrent: ({ commit, state }, id) => {
      commit('SETBEER', state.beers.find(beer => beer.id == id))
    },
    // Adds a rating, then gets that beer to ensure we have the new rating
    // Could expand on this and not get the beer again, create the average on the fly based on beer.rating and beer.ratingCount
    addRating: async ({ commit, dispatch, state }, rating) => {
      try {
        commit('SHOWLOADING', true)
        await client.post('ratings', {
          ...rating,
          id: state.currentBeer.id
        })
        dispatch('getBeer', state.currentBeer.id)
        commit('SHOWLOADING', false)
        dispatch('success', 'Successfully add the rating')
        // Return true so that the client knows its all done.
        return true
      } catch (err) {
        dispatch('error', err)
        commit('SHOWLOADING', false)
      }
    },
    error: ({ commit }, message) => {
      commit('ERROR', message)
    },
    success: ({ commit }, message) => {
      commit('SUCCESS', message)
    }
  }
})
