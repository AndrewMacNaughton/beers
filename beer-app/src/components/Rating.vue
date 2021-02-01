<template>
  <div class="rating">
    <div v-if="!editMode">
      <!-- Read Only -->
      <!-- Show gold stars for the rating that is there -->
      <span
        v-for="(n, goldStar) in _rating"
        :key="goldStar"
        class="material-icons gold"
        >star_rate</span
      >
      <!-- Fill the rest of the stars as darkstars -->
      <span
        v-for="(o, index) in 5 - _rating"
        :key="'A' + index"
        class="material-icons"
        >star_rate</span
      >
    </div>
    <!-- End Read Only -->
    <!-- Edit Mode -->
    <div v-else>
      <span
        v-for="(o, index) in 5"
        :key="'A' + index"
        class="material-icons pointer"
        :class="{ gold: index < newRating }"
        @click.stop="setNewRating(index + 1)"
        >star_rate</span
      >
    </div>
    <!-- end Edit Mode -->
  </div>
</template>

<script>
// Has 2 modes. Displays the rating by default. Allows adding a rating when props.editMode = true
// COuld be made more dynamic by not limiting to 5 stars.
export default {
  name: 'Rating',
  props: ['rating', 'editMode'],
  data: function () {
    return {
      newRating: 0
    }
  },
  computed: {
    // Try and convert the rating to a number. Return 0 if there if it can't be formatted
    _rating: function () {
      if (!isNaN(parseInt(this.rating))) {
        return parseInt(this.rating)
      } else {
        return 0
      }
    }
  },
  methods: {
    setNewRating: function (index) {
      this.newRating = index
      this.$emit('newRating', this.newRating)
    }
  }
}
</script>

<style lang='scss' scoped>
.gold {
  color: #ffeb3b;
}
</style>