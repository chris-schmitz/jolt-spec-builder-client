<template>
  <div class="output-panel-container">
    <h1>Output Panel</h1>
    <textarea
        :value="JSON.stringify(store.output, null, 2)"
    />
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
import {useSpecStore} from "@/store/SpecStore";

const props = defineProps(["modelValue"])
const store = useSpecStore()

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