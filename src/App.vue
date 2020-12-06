<template>
  <div id="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from './components/Layout/Layout.vue';
import VueRouter, { Route } from 'vue-router';
import { Store } from 'vuex';

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;
  }
}

export default Vue.extend({
  components: {
    Layout
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
