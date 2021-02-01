<template>
  <div class="header">
    <div class="container">
      <h1>BEER PUNK</h1>
      <Search />
    </div>
  </div>
</template>

<script>
import Search from './Search.vue'
export default {
  components: { Search },
  name: 'Header'
}
</script>

<style lang='scss' scoped>
.header {
  background-color: #e26d5a;
  min-height: 250px;
  color: #f8ebeb;
  h1 {
    padding-top: 40px;
  }
}
</style>