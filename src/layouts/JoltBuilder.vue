<template>
  <div class="jolt-builder-layout">
    <div class="header">
      <h1>Jolt Builder</h1>
      <select v-model="state.specView">
        <option value="blocks">Blocks</option>
        <option value="full">Full Spec</option>
      </select>
      <button @click="runTransformation">Run Transform</button>
    </div>
    <div class="body">
      <div class="left-panel" v-if="state.specView === 'blocks'">
        <block-menu></block-menu>
      </div>
      <div class="center-panel">
        <spec-renderer v-if="state.specView === 'blocks'"></spec-renderer>
        <full-spec-input v-if="state.specView === 'full'"></full-spec-input>
      </div>
      <div class="right-panel">
        <input-panel></input-panel>
        <output-panel></output-panel>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BlockMenu from '@/components/BlockMenu.vue';
import SpecRenderer from '@/components/SpecRenderer.vue';
import InputPanel from '@/components/InputPanel.vue';
import OutputPanel from '@/components/OutputPanel.vue';
import FullSpecInput from '@/components/FullSpecInput.vue';

import {useSpecStore} from '@/store/SpecStore';
import {reactive} from 'vue'
import {specSubmitter} from "@/main";

const store = useSpecStore();

const state = reactive({
  specView: 'blocks',
})

function runTransformation() {
  specSubmitter.runTransformation()
}
</script>

<style scoped>
.jolt-builder-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.body {
  display: flex;
  flex: 1;
}

.left-panel .center-panel .right-panel {
  display: flex;
  margin: 0;
  padding: 0;
}

.left-panel {
  /*background: green;*/
  flex: 0 0 150px;
  display: flex;
}

.center-panel {
  flex: 1;
  display: flex;
  /*overflow-y: scroll;*/
  /*background: crimson;*/
}

.right-panel {
  flex: 0 0 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>