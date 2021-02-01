import Vue from 'vue'
import VueRouter from 'vue-router'
import Beers from './../components/Beers.vue'
import Beer from './../components/Beer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Beers',
    component: Beers
  },
  {
    path: '/beer/:id',
    name: 'Beer',
    component: Beer
  }

]

const router = new VueRouter({
  routes
})

export default router
