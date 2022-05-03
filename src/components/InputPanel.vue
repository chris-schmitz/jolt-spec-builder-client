<template>
  <div class="input-panel-container">
    <h1>Input Panel</h1>
    <textarea
        :value="props.modelValue"
        @input="(event) => $emit('update:modelValue', event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps(["modelValue"])
</script>

<style scoped>
.input-panel-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

textarea {
  flex: 1;
  /*height: 200px;*/
}
</style>