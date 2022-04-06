<template>
  <div class="jolt-builder-layout">
    <div class="header">
      <h1>Jolt Builder</h1>
    </div>
    <div class="body">
      <div class="left-panel">
        <block-menu></block-menu>
      </div>
      <div class="center-panel">
        <spec-panel :spec-blocks="specBlocks"></spec-panel>
      </div>
      <div class="right-panel">
        <input-panel></input-panel>
        <output-panel></output-panel>
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
      test: "pending...",
      specBlocks: [
        {
          id: 1,
          label: "Raw Jolt",
          type: "raw-jolt",
          document: {
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
          }
        },
        {
          id: 2,
          label: "Raw Jolt",
          type: "raw-jolt",
          document: {
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
          }
        }
      ]
    }
  },
  created() {
    fetch("http://localhost:8080/")
        .then(response => response.text())
        // .then(response => response.json())
        .then(data => this.test = data)
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
  background: purple;
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