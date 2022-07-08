<template>
  <div class="wrapper">
    <textarea
        :value="specListAsString"
        @change="handleInput"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import {useSpecStore} from '@/store/SpecStore';
import {computed, onBeforeMount} from "vue";
import SpecSubmitter from "@/utilities/SpecSubmitter";


const store = useSpecStore()
const specSubmitter = SpecSubmitter.getInstance()
const specListAsString = computed(() => JSON.stringify(store.joltOperationList, null, 2))


async function handleInput(event: InputEvent) {
  const specList = JSON.parse((event.target as HTMLTextAreaElement).value)
  store.setJoltSpec(specList);
  await specSubmitter.runTransformationOnJoltOperationList()
}

onBeforeMount(() => {
  if (store.uiBlockOperationList.length > 0) {
    store.updateJoltSpecFromBlocks();
  }
})
</script>

<style scoped>
.wrapper {
  background: rebeccapurple;
  display: flex;
  margin-top: 10px;
  flex: 1;
}

textarea {
  flex: 1;
}

.wrapper div {
  flex: 1;
}
</style>