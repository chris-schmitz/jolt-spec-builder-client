<template>
  <div class="output-panel-container">
    <h1>Output Panel</h1>
    <textarea
        :value="JSON.stringify(props.modelValue, null, 2)"
        @input="(event) => $emit('update:modelValue', event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

const props = defineProps(["modelValue"])
</script>

<style scoped>
.output-panel-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

textarea {
  flex: 1;
}
</style>