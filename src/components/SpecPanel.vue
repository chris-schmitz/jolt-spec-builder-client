<template>
  <div
      class="spec-block"
      v-for="(block, index) in specBlocks"
      v-bind:key="block.id"
  >
    <!--    <raw-jolt :block="block" :index="index" @updateBlock="updateBlock"></raw-jolt>-->
    <component
        :index="index"
        :is="determineBlockComponent(block)"
        :block="block"
        @updateBlock="updateBlock"
        @blockOperationUpdated="updateBlockOperation"
    ></component>
    {{ test }}
    <hr>
    {{ specBlocks[0]?.spec }}
  </div>

</template>

<script>
import RawJolt from "@/components/transformation-widgets/RawJolt";
import ShiftOperation from "@/components/transformation-widgets/ShiftOperation";
import sharedState from "@/store/shared-state"

export default {
  name: "SpecPanel",
  components: {RawJolt, ShiftOperation},
  data() {
    return {
      specBlocks: "",
      test: sharedState.specBlocks[0]?.spec
    }
  },
  methods: {
    updateBlockOperation(event) { // ! this should DEF be a class
      this.specBlocks.splice(event.index, 1, event.operation)

      const formatted = this.formatSpec()
      // sharedState.specBlocks.splice(0, sharedState.specBlocks.length, ...formatted)
      sharedState.specBlocks = formatted
      console.log("formatting spec in spec panel")
      console.log(JSON.stringify(sharedState.specBlocks))
    },
    updateBlock(event) {
      //TODO: replace with splicing tools 
      this.specBlocks[event.index] = JSON.parse(event.data, null, 2)
    },
    determineBlockComponent(block) {
      switch (block.blockType) {
        case 'shift':
          return 'ShiftOperation'
        default:
          return 'RawJolt'
      }
    },

    formatShiftBlock(block) {
      if (block.passAlong) {
        block.spec["@"] = ""
        delete block.passAlong
      }
      return block
    },

    formatSpec() {
      //   * loop through and apply any view shape to storage shape transformations
      const formattedSpec =
          this.specBlocks
              .map(block => {
                let formatted
                switch (block.blockType) {
                  case "shift":
                    formatted = this.formatShiftBlock(block)
                    break
                  default:
                    formatted = block
                }
                return formatted
              })
      return formattedSpec
    },
  },
  created() {
    //   * loop through and apply any  storage shape to view shape transformations
    const specBlocksWithTooling =
        sharedState.specBlocks
            .map(block => {
              // * hacky map, refactor
              if ("blockType" in block) return block

              switch (block.operation) {
                case "shift":
                  block["blockType"] = "shift"
                  break
                case "default":
                  block["blockType"] = "raw"
                  break
                default:
                  block["blockType"] = "raw"
                  break
              }
              return block
            })
    this.specBlocks = specBlocksWithTooling
  },
}
</script>

<style scoped>
.spec-block {
  background: lightseagreen;
  display: flex;
  margin-top: 10px;
}

.spec-block * {
  flex: 1;
}
</style>