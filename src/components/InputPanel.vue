<template>
  <div class="input-panel-container">
    <h1>Input Panel</h1>
    <textarea></textarea>
  </div>
</template>

<script>
export default {
  name: "InputPanel"
}
</script>

<style scoped>
.input-panel-container {
  background: honeydew;
  flex: 1;
  display: flex;
  flex-direction: column;
}

textarea {
  flex: 1;
}

</style>