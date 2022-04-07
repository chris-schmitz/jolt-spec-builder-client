<template>
  <div class="jolt-builder-layout">
    <div class="header">
      <h1>Jolt Builder</h1>
      <button @click="submit">submit</button> <!-- todo ripout after adding blur trigger?? -->
    </div>
    <div class="body">
      <div class="left-panel">
        <block-menu></block-menu>
      </div>
      <div class="center-panel">
        <spec-panel :spec-blocks="specBlocks"></spec-panel>
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
import SpecPanel from "@/components/SpecPanel"
import InputPanel from "@/components/InputPanel"
import OutputPanel from "@/components/OutputPanel"

export default {
  name: "JoltBuilder",
  components: {
    BlockMenu,
    SpecPanel,
    InputPanel,
    OutputPanel
  },
  data() {
    return {
      input: "",
      output: "",
      specBlocks: [
        {
          "operation": "shift",
          "spec": {
            "rating": {
              "primary": {
                "value": "Rating"
              },
              "*": {
                "value": "SecondaryRatings.&1.Value",
                "$": "SecondaryRatings.&.Id"
              }
            }
          }
        },
        {
          "operation": "default",
          "spec": {
            "Range": 5,
            "SecondaryRatings": {
              "*": {
                "Range": 5
              }
            }
          }
        }
      ]
    }
  },
  methods: {
    async submit() {
      const input = this.input
      const spec = JSON.stringify(this.specBlocks)
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
      return content
    },
    updateInput(event) {
      this.input = event.data
    }
  },
  created() {
  }
}
</script>

<style scoped>
/* TODO ripout */
.jolt-builder-layout * {
  border: 1px solid white;
}

.jolt-builder-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}


.header {
  background: magenta;
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
  background: green;
  flex: 0 0 150px;
  display: flex;
}

.center-panel {
  flex: 1;
}

.right-panel {
  flex: 0 0 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>