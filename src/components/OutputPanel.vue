<template>
  <div class="output-panel-container">
    <h1>Output Panel</h1>
    <textarea></textarea>
  </div>

</template>

<script>
export default {
  name: "OutputPanel"
}
</script>

<style scoped>
.output-panel-container {
  background: crimson;
  flex: 1;
  display: flex;
  flex-direction: column;
}

textarea {
  flex: 1;
}
</style>