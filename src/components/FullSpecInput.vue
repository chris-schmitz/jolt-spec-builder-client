<template>
  <div class="wrapper">
    <textarea :value="specListAsString" @change="handleInput"></textarea>
  </div>
</template>

<script lang="ts" setup>
import {useSpecStore} from '@/store/SpecStore';
import {onBeforeMount, computed} from "vue";

const store = useSpecStore()

const specListAsString = computed(() => JSON.stringify(store.joltSpecList, null, 2))

function handleInput(event: InputEvent) {
  const specList = JSON.parse((event.target as HTMLTextAreaElement).value)
  store.setJoltSpec(specList);
}

onBeforeMount(() => {
  if (store.specBlockList.length > 0) {
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