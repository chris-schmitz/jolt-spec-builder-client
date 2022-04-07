<template>
  <div class="output-panel-container">
    <h1>Output Panel</h1>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>

</template>

<script>
export default {
  name: "OutputPanel",
  props: ["modelValue"]
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