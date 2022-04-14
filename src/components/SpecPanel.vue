<template>
  <div
      class="spec-block"
      v-for="(block, index) in specBlocks"
      v-bind:key="block.id"
  >
    <!--  replace with slots  -->
    <raw-jolt :block="block" :index="index" @updateBlock="updateBlock"></raw-jolt>
  </div>

</template>

<script>
import RawJolt from "@/components/transformation-widgets/RawJolt";
import sharedState from "@/store/shared-state"

export default {
  name: "SpecPanel",
  components: {RawJolt},
  data() {
    return {
      specBlocks: sharedState.specBlocks
    }
  },
  methods: {
    updateBlock(event) {
      //TODO: replace with splicing tools 
      this.specBlocks[event.index] = JSON.parse(event.data, null, 2)
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