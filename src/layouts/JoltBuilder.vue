<template>
  <div class="jolt-builder-layout">
    <div class="header">
      <h1>Jolt Builder</h1>
      <button @click="submit">submit</button>
      <!-- todo ripout after adding blur trigger?? -->
      <select v-model="state.specView">
        <option value="blocks">Blocks</option>
        <option value="full">Full Spec</option>
      </select>
    </div>
    <div class="body">
      <div class="left-panel">
        <block-menu></block-menu>
      </div>
      <div class="center-panel">
        <spec-renderer v-if="state.specView === 'blocks'"></spec-renderer>
        <!--        <spec-panel v-if="state.specView === 'blocks'"></spec-panel>-->
        <full-spec-input v-if="state.specView === 'full'"></full-spec-input>
      </div>
      <div class="right-panel">
        <input-panel v-model="state.input"></input-panel>
        <output-panel v-model="state.output"></output-panel>
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
import {defineComponent, reactive, ref, toRefs} from 'vue'
import {convertBlockToSpec} from "@/domain/ui-block/UiBlockUtilities";

const store = useSpecStore();
const state = reactive({

  input: '',
  output: '',
  specView: 'blocks',
})

async function submit() {
  const spec = convertBlockToSpec(store.specBlocks);
  const content = await _submitSpecAndInput({spec, input: state.input});
  state.output = content;
  return Promise.resolve()
}

// TODO: come back and add type to body
async function _submitSpecAndInput(body: any) {
  const response = await fetch('http://localhost:8080/transform', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

// export default defineComponent({
//   name: 'JoltBuilder',
//   components: {
//     FullSpecInput,
//     BlockMenu,
//     SpecRenderer,
//     InputPanel,
//     OutputPanel,
//   },
//   setup() {
//     const store = useSpecStore();
//     const state = reactive({
//       input: '',
//       output: '',
//       specView: 'blocks',
//     });
//
//     return {...toRefs(state), store}
//   },
//   methods: {
//     async submit() {
//       const input = this.input;
//       const spec = transformBlocksToSpec(this.store.specBlocks);
//       const content = await this._submitSpecAndInput({spec, input});
//       this.output = content;
//       return Promise.resolve()
//     },
//     // TODO: come back and add type to body
//     async _submitSpecAndInput(body: any) {
//       const response = await fetch('http://localhost:8080/transform', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });
//       const content = await response.json();
//       console.log('updated');
//       return content;
//     },
//   },
// });
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