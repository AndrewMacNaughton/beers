<template>
  <div class="search">
    <div class="container">
      <div class="row">
        <!-- Would make this more dynamic sizing based on viewport size using mixins -->
        <div class="col-12">
          <input
            v-model="searchTerm"
            class="input"
            placeholder="search for a beer..."
            type="text"
            @keydown.enter="search"
          />
          <button @click="search" class="pointer">Go</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: function () {
    return {
      searchTerm: ''
    }
  },
  methods: {
    search: async function () {
      // If there is no search term send a request without params.
      if (this.searchTerm) {
        await this.$store.dispatch('getBeers', { beer_name: this.searchTerm })
      } else {
        await this.$store.dispatch('getBeers')
      }
      // Redirect the user to the home page if they aren't already there.
      if (this.$route.name !== 'Beers') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.center {
  align-items: center;
  justify-content: center;
}
.search {
  .input {
    width: 70%;
    max-width: 600px;
    line-height: 4rem;
    font-size: 24px;
    padding: 8px 16px;
    color: #e26d5a;
    border: none;
    &:focus {
      outline: none;
    }
  }
}
button {
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  background-color: #f8ebeb;
  border-radius: 4px;
  color: #e26d5a;
  padding: 0 16px;
  font-size: 24px;
  height: 60px;
  border: none;
  text-transform: uppercase;
}
</style>