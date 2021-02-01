<template>
  <div class="add-rating">
    <div class="wrapper">
      <div>Add Rating <span class="right material-icons pointer" @click="$emit('cancel')">close</span></div>
    </div>
    <div class='push-down-20'>
      Select a rating from 1 - 5
      <Rating
        @newRating="handleNewRating"
        :editMode="true"
        class="push-down-10"
      />
    </div>
    <p>Add your comments about the beer</p>
    <textarea type="text" v-model="comments" />
    <br />
    <button class="pointer" @click.stop="addRating">Add Rating</button>
    <hr />
  </div>
</template>

<script>
import Rating from './Rating.vue'
export default {
  components: { Rating },
  data: function () {
    return {
      comments: '',
      rating: 0
    }
  },
  methods: {
    // This would needd validation before moving to production
    addRating: async function () {
      const added = await this.$store.dispatch('addRating', {
        rating: this.rating,
        comments: this.comments
      })
      // Emit the added event. This lets the parent container know that everything was sucessful and make UI changes.
      if (added) this.$emit('added')
    },
    // Called when the user sets the rating by clicking on a star.
    handleNewRating: function (newRating) {
      this.rating = newRating
    }
  }
}
</script>

<style lang='scss' scoped>
.add-rating {
  margin-top: 20px;
}
.right {
  position: absolute;
  right: 2%;
}
.wrapper {
  background-color: #efa8b8;
  padding: 8px;
  color: #f8ebeb;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
textarea {
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgb(235, 235, 235);
  border: none;
  width: 80%;
  max-width: 600px;
  min-height: 200px;
  color: #2c3e50;
  &:focus {
    outline: none;
  }
}
.push-down-10 {
  margin-top: 10px;
}
.push-down-20 {
  margin-top: 20px;
}
button {
  background-color: #e26d5a;
  border-radius: 2px;
  color: #f8ebeb;
  padding: 0 16px;
  height: 45px;
  border: none;
  text-transform: uppercase;
}
</style>