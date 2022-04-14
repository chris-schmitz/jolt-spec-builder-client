<template>
  <JoltBuilder></JoltBuilder>
</template>

<script>
import JoltBuilder from "@/layouts/JoltBuilder";

export default {
  name: 'App',
  components: {
    JoltBuilder
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  background: cadetblue;
}

h1, h2, h3, h4, h5, h6 {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
