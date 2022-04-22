<template>
  <div class="jolt-builder-layout">
    <div class="header">
      <h1>Jolt Builder</h1>
      <button @click="submit">submit</button> <!-- todo ripout after adding blur trigger?? -->
      <select v-model="specView">
        <option value="blocks">Blocks</option>
        <option value="full">Full Spec</option>
      </select>
    </div>
    <div class="body">
      <div class="left-panel">
        <block-menu></block-menu>
      </div>
      <div class="center-panel">
        <spec-renderer v-if="specView === 'blocks'"></spec-renderer>
        <!--        <spec-panel v-if="specView === 'blocks'"></spec-panel>-->
        <full-spec-input v-if="specView === 'full'"></full-spec-input>
      </div>
      <div class="right-panel">
        <input-panel v-model="input"></input-panel>
        <output-panel v-model="output"></output-panel>
      </div>
    </div>
  </div>
</template>

<script>
import BlockMenu from "@/components/BlockMenu";
// import SpecPanel from "@/components/SpecPanel"
import SpecRenderer from "@/components/SpecRenderer";
import InputPanel from "@/components/InputPanel"
import OutputPanel from "@/components/OutputPanel"
import sharedState from "@/store/shared-state"
import FullSpecInput from "@/components/FullSpecInput";


export default {
  name: "JoltBuilder",
  components: {
    FullSpecInput,
    BlockMenu,
    // SpecPanel,
    SpecRenderer,
    InputPanel,
    OutputPanel
  },
  data() {
    return {
      input: "",
      output: "",
      // specBlocks: sharedState.specBlocks,
      specView: 'blocks'
    }
  },
  methods: {
    async submit() {
      const input = this.input
      const spec = JSON.stringify(sharedState.specBlocks)
      const content = await this._submitSpecAndInput({spec, input})
      this.output = content
    },
    async _submitSpecAndInput(body) {
      const response = await fetch("http://localhost:8080/transform", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const content = await response.json()
      console.log('updated')
      return content
    }
  },
  created() {
  }
}
</script>

<style scoped>
/* TODO ripout */
.jolt-builder-layout * {
  /*border: 1px solid white;*/
}

.jolt-builder-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}


.header {
  /*background: magenta;*/
  /*flex: 0 0 25px;*/
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