<template>
  <div id="app">
    <ul>
      <li><b-link href="/">/</b-link></li>
      <li><b-link href="/home">/home</b-link></li>
    </ul>
    <b-alert variant="success" show>Success Alert</b-alert>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
</style>
