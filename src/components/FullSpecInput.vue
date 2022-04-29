<template>
  <div class="wrapper">
    <textarea :value="store.joltSpec" @input="handleInput"></textarea>
    <!--    <textarea :value="specBlocks" @input="specBlocks = $event.target.value"></textarea>-->
  </div>
</template>

<script lang="ts" setup>
import {useSpecStore} from '@/store/SpecStore';
import {defineComponent, onBeforeMount, onMounted} from "vue";

const store = useSpecStore()

function handleInput(event: InputEvent) {
  store.setJoltSpec(event.target.value || "");
}

onBeforeMount(() => {
  if (store.specBlocks.length > 0) {
    // store.updateBlocksFromJoltSpec()
    store.updateJoltSpecFromBlocks();
  }
})
</script>

<style scoped>
.wrapper {
  /*background: lightseagreen;*/
  display: flex;
  margin-top: 10px;
  flex: 1;
}

textarea {
  flex: 1;
  height: 200px;
}

.wrapper div {
  flex: 1;
}
</style>