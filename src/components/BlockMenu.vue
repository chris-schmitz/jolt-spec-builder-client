<template>
  <div class="block-menu">
    <h1>Block menu</h1>
    <div class="block-container">
      <button
          class="block"
          v-for="block in blocks"
          v-text="block.label"
          v-bind:key="block.type"
          @click="insertBlock(block.type)"
      ></button>
    </div>
  </div>

</template>

<script>
import sharedState from "@/store/shared-state.js"

export default {
  name: "BlockMenu",
  data() {
    return {
      spec: sharedState.specBlocks,

      // * pull out to a class, prob worth switching to typescript at some point
      blocks: [
        {
          label: "Raw Jolt",
          type: "raw-jolt",
          template: {}
        },
        {
          label: "Default",
          type: "defaultr",
          template: {}
        },
        {
          label: "Shift",
          type: "shiftr",
          template: {
            "operation": "shift",
            "spec": {}
          }
        },
        {
          label: "Sort",
          type: "sortr",
          template: {}
        },
        {
          label: "Rename Column",
          type: "renamer",
          template: {}
        },
        {
          label: "Un-nest",
          type: "unnester",
          template: {}
        },
        {
          label: "Nest",
          type: "nestr",
          template: {}
        },
      ]
    }
  },
  methods: {
    insertBlock(type) {
      const block = this.blocks.filter(b => b.type === type).pop()
      this.spec.splice(this.spec.length, 0, block.template)
    }
  }
}
</script>

<style scoped>
.block-menu {
  /*flex: 1;*/
  display: flex;
  flex-direction: column;
  /*background: orangered;*/
  /*justify-content: space-around;*/
}

.block-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /*background: pink;*/
  flex: 1;
}

.block {
  /*border: 1px solid red;*/
  /*background: lightblue;*/
  flex: 0 0 80px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>