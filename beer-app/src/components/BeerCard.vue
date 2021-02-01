<template>
  <div
    class="card card-body flex-fill beer-card"
    :class="{ pointer: id }"
    @click="handleClick"
  >
    <h3 class="header">{{ name }}</h3>
    <div class="wrapper">
      <div class="img-wrapper">
        <img class="image-thumb" :src="imageUrl" />
      </div>
      <div class="ratings">
        <Rating :rating="rating" />
      </div>
    </div>
    <div v-if="allowAddRating" class="add-rating">
      <div>
        <p class="review pointer" @click.stop="showRating = !showRating">
          Add your own review!
        </p>
        <AddRating @added="showRating = false" v-if="showRating" />
      </div>
    </div>

    <div class="wrapper">
      <div>
        <div class="description push-down-20" v-if="description">
          {{ description }}
        </div>
        <div class="description push-down-20" v-else>
          {{ shortDescription }}
        </div>
      </div>
      <div v-if="foodPairing" class="food-pairings">
        <h5>This beer pairs well with the following foods</h5>
        <div class="container">
          <div class="row pairing push-down-20">
            <div
              class="col-6"
              v-for="(item, index) in foodPairing"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddRating from './AddRating.vue'
import Rating from './Rating'
export default {
  name: 'BeerCard',
  props: [
    'name',
    'imageUrl',
    'shortDescription',
    'description',
    'foodPairing',
    'rating',
    'id',
    'allowAddRating'
  ],
  components: {
    Rating,
    AddRating
  },
  data: function () {
    return {
      showRating: false
    }
  },
  methods: {
    // This handles the navigation to the Beer Component if its on the list of beers
    handleClick: function () {
      // Only do something if the id is present as this card is used on both the Beers/Beer components.
      if (this.id) {
        this.$router.push('/beer/' + this.id)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.image-thumb {
  height: 200px;
}
.beer-card {
  padding: 0px;
  max-width: 800px;
  margin-bottom: 16px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.19), 0 2px 2px rgba(0, 0, 0, 0.23);
  .header {
    background-color: #efa8b8;
    padding: 8px;
    color: #f8ebeb;
  }
  .wrapper {
    padding: 1.25em;
    .img-wrapper {
      padding-bottom: 16px;
    }
  }
}
.food-pairings {
  margin-top: 40px;
  background-color: #efa8b8;
  color: #f8ebeb;
  padding: 20px 0px;
  border-radius: 4px;
}
.pairing {
  text-align: left;
}
.review {
  color: #884353;
  border-bottom: dashed 1px;
  max-width: 165px;
  margin: auto;
}
.push-down-20 {
  margin-top: 20px;
}
</style>