<template>
  <div id="app">
    <Menu />

    <Layout>
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Layout from "./components/Layout";

export default {
  name: "App",
  components: {
    Menu,
    Layout
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
