<template>
  <div id="app">
    <nav>
      <div class="row">
        <router-link :to="{ name: 'PublicPageOne' }">public 1</router-link>
        <router-link :to="{ name: 'PublicPageTwo' }">public 2</router-link>
        <template v-if="isLoggedIn">
          <router-link :to="{ name: 'PrivatePageOne' }">private 1</router-link>
          <router-link :to="{ name: 'PrivatePageTwo' }">private 2</router-link>
        </template>
      </div>
      <div class="row">
        <template v-if="isLoggedIn">
          <button class="button" @click="logout">logout</button>
        </template>
        <template v-else>
          <router-link :to="{ name: 'AuthRegister' }">register</router-link>
          <router-link class="button" :to="{ name: 'AuthLogin' }">
            login
          </router-link>
        </template>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  created() {
    this.$store.dispatch("restoreUserData");
  },
};
</script>

<style lang="scss">
@import "@/assets/styles";

nav {
  border-bottom: 1px solid #ccc;
  margin-bottom: 80px;
  .row {
    display: flex;
    justify-content: center;
    margin: 20px;
    gap: 10px;
  }
}
</style>
