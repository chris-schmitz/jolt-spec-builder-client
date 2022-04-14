<template>
  <div class="input-panel-container">
    <h1>Input Panel</h1>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "InputPanel",
  props: ["modelValue"],
};
</script>

<style scoped>
.input-panel-container {
  /*background: honeydew;*/
  flex: 1;
  display: flex;
  flex-direction: column;
}

textarea {
  flex: 1;
}
</style>