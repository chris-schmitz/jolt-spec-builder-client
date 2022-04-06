<template>
  <div
      class="spec-block"
      v-for="block in specBlocks"
      v-bind:key="block.id"
  >
    <!--  replace with slots  -->
    <raw-jolt :block="block"></raw-jolt>
  </div>

</template>

<script>
import RawJolt from "@/components/transformation-widgets/RawJolt";

export default {
  name: "SpecPanel",
  components: {RawJolt},
  props: ["specBlocks"],
  data() {
    return {}
  }
}
</script>

<style scoped>
.spec-block {
  background: lightseagreen;
  display: flex;
  margin-top: 10px;
}

textarea {
  flex: 1;
  height: 200px;
}
</style>