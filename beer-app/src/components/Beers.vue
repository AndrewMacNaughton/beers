<template>
  <div class="beers">
    <div class="container">
      <h3>All the Beers!</h3>
      <div class="row" v-if="beerList && beerList.length > 0">
        <div
          v-for="(item, index) in beerList"
          :key="index"
          class="col-12 col-sm-6 d-flex"
        >
          <BeerCard
            :name="item.name"
            :shortDescription="item.shortDescription"
            :imageUrl="item.imageUrl"
            :id="item.id"
            :rating="item.rating"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BeerCard from './BeerCard.vue'

export default {
  components: { BeerCard },
  name: 'Beers',
  computed: {
    beerList: function () {
      return this.$store.state.beers.map((beer) => {
        return {
          ...beer,
          // Add a truncated description for beers that have over 200 charatcers as it takes too much space.
          shortDescription:
            beer.description.length > 200
              ? beer.description.substring(0, 200).trim() + '...'
              : beer.description
        }
      })
    }
  },
  mounted() {
    // Only get beers if there aren't any already there.
    if (this.$store.state.beers.length === 0) {
      this.$store.dispatch('getBeers')
    }
  }
}
</script>

<style>
</style>