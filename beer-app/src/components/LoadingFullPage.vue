<template>
  <loading
    color="rgb(187, 57, 54)"
    :active.sync="showLoading"
  ></loading>
</template>

<script>
import loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapState } from 'vuex'
// Quick and dirty full page loader.
export default {
  name: 'LoadingFullPage.vue',
  components: { loading },
  computed:{
    ...mapState({
      showLoading : state => state.showLoading
    })
  }

}
</script>

<style lang='scss'>

</style>