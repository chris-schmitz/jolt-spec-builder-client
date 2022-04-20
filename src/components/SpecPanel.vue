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
      specBlocks: sharedState.specBlocks
    }
  },
  methods: {
    updateBlockOperation(event) { // ! this should DEF be a class
      this.specBlocks.splice(event.index, 1, event.operation)
      // this.specBlocks[event.index] = JSON.parse(event.operation, null, 2)
    },
    updateBlock(event) {
      //TODO: replace with splicing tools 
      this.specBlocks[event.index] = JSON.parse(event.data, null, 2)
    },
    determineBlockComponent(block) {
      switch (block.operation) {
        case 'shift':
          return 'ShiftOperation'
        default:
          // ? how are we going to specify a raw jolt if we're looking at the spec operation?
          // * we prob need to separate the display of the spec from the generation of it so we can layer
          // * in some metadata about the blocks
          return 'RawJolt'
      }
    }
  }
}
</script>

<style scoped>
.spec-block {
  /*background: lightseagreen;*/
  display: flex;
  margin-top: 10px;
}

textarea {
  flex: 1;
  height: 200px;
}
</style>