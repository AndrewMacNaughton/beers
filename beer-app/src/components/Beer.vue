<template>
  <div class="beer">
    <div class="container">
      <BeerCard
        :name="currentBeer.name"
        :imageUrl="currentBeer.imageUrl"
        :description="currentBeer.description"
        :foodPairing="currentBeer.foodPairing"
        :rating="currentBeer.rating"
        :allowAddRating="true"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BeerCard from './BeerCard.vue'
export default {
  components: { BeerCard },
  name: 'Beer',
  mounted() {
    //Check to see if the beer is already in the store, if so get data from there
    const beerId = this.$route.params.id
    if (this.$store.state.beers.find((beer) => beer.id == beerId)) {
      this.$store.dispatch('setBeerAsCurrent', beerId)
    } else {
      // Otherwise get the data from API
      this.$store.dispatch('getBeer', beerId)
    }
  },
  computed: {
    ...mapState({
      currentBeer: (state) => state.currentBeer
    })
  }
}
</script>

<style lang='scss' scoped>
.beer-image {
  max-height: 400px;
}
h2 {
  background-color: #efa8b8;
  padding: 20px;
  color: #f8ebeb;
}
.no-pad {
  padding: 0px;
}

.container {
  padding-bottom: 100px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.row {
  padding-bottom: 40px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.19), 0 2px 2px rgba(0, 0, 0, 0.23);
}
</style>