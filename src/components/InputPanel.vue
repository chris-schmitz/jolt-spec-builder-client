<template>
  <div class="input-panel-container">
    <h1>Input Panel</h1>
    <textarea
        :value="props.modelValue"
        @blur="notifyOfInputUpdate"
    />
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
import {useSpecStore} from "@/store/SpecStore";

const props = defineProps(["modelValue"])

const store = useSpecStore()

function notifyOfInputUpdate(event: InputEvent) {
  store.input = (event.target as HTMLTextAreaElement).value
}

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