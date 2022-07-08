<template>
  <div class="input-panel-container">
    <h1>Input Panel</h1>
    <textarea
        :value="props.modelValue"
        @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
import {useSpecStore} from "@/store/SpecStore";
import SpecSubmitter from "@/utilities/SpecSubmitter";

const props = defineProps(["modelValue"])
const specSubmitter = SpecSubmitter.getInstance()
const store = useSpecStore()

async function handleChange(event: InputEvent) {
  notifyOfInputUpdate(event)
  await specSubmitter.runTransformationOnJoltOperationList()
}


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