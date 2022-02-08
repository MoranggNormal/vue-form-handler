<template>
  <div id="app">
    <Home test="Hello Vue!" />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
html,
body {
  font-family: "Work Sans", sans-serif;
}
#app {
  font-family: "Work Sans", sans-serif;
}
</style>
