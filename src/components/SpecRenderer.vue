<template>
  <div class="renderer-wrapper">
    <component
        v-for="(block,index) in store.specBlocks"
        v-bind:key="index"
        :block="block"
        :index="index"
        :is="determineBlockComponent(block)"
        @block-operation-updated="updateBlock"
    >
      {{ block }}
    </component>
  </div>
</template>

<script>
import {determineBlockComponent, useSpecStore} from "@/store/SpecStore.js";
import ShiftOperation from "@/components/transformation-widgets/ShiftOperation";
import RawJolt from "@/components/transformation-widgets/RawJolt";


export default {
  name: "SpecRenderer",
  components: {
    ShiftOperation,
    RawJolt
  },
  beforeCreate() {
    // ? should this be in a lifecycle hook or the composition api hook?
    if (this.store.joltSpec)
      this.store.updateBlocksFromJoltSpec()
  },
  methods: {
    updateBlock(event) {
      this.store.updateBlock(event)
      //  TODO next steps:
      //  - format the blocks as a spec in a variable
      //  - pull the input and fire the API call
      //  - throw the output in output
      //  ! DON'T update the jolt spec in the store
    }
  },
  setup() {
    const store = useSpecStore()
    return {
      store,
      determineBlockComponent
    }
  }
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