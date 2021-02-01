<template>
  <div id="app">
    <Toast />
    <Loading />
    <Header />
    <router-view />
  </div>
</template>
<script>
import Toast from './components/Toast'
import Loading from './components/LoadingFullPage'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: { Toast, Loading, Header }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.pointer {
  cursor: pointer;
}
a {
  color: #2c3e50;
}
a:hover{
  text-decoration: none;
   color: #2c3e50;
}
</style>
