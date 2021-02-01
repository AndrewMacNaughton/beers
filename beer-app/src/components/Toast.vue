<template>
  <div class="toast"></div>
</template>

<script>
/* This handles all the toasts that appear. Both success and errors*/
/* It does this by listening to the Vuex store properties named Successes and Errors*/
import Toasted from 'vue-toasted'
import Vue from 'vue'
import { mapState } from 'vuex'
const globalErrorIntro = 'Ooops something went wrong... '
// Setup some global options for the toast object
const toastOptions = {
  position: 'bottom-right',
  duration: 5000,
  action: {
    text: 'X',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    },
  },
}
Vue.use(Toasted, toastOptions)
export default {
  name: 'Toast',
  computed: {
    // Get the values from the Vuex Store.
    ...mapState({
      errors: (state) => state.errorHandlers.errors,
      successes: (state) => state.errorHandlers.successes,
    }),
  },
  watch: {
    errors() {
      // Log the error to the console so it stays after the toast goes for debugging purposes
      console.log(this.errors[0])
      // Show the toast
      Vue.toasted.show(globalErrorIntro + '<br/> ' + this.errors[0].message, {
        className: ['toast', 'toast-error'],
      })
    },
    successes() {
      //Show the toast on a success.
      Vue.toasted.show('Awesome, That Worked!' + '<br/> ' + this.successes[0], {
        className: ['toast', 'toast-success'],
      })
    },
  },
}
</script>

<style lang='scss'>
.toast {
  line-height: 2em !important;
  min-width: 280px;
  &.toast-error {
    background-color: rgb(187, 57, 54) !important;
  }
  &.toast-success {
    background-color: #3f826d !important;
  }
  .action {
    position: absolute;
    top: -5px;
    right: 5px;
    margin: 0px !important;
  }
}
</style>