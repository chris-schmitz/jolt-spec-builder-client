<template>
  <div class="wrapper">
    <textarea :value="specStore.joltSpec" @input="handleInput"></textarea>
    <!--    <textarea :value="specBlocks" @input="specBlocks = $event.target.value"></textarea>-->
  </div>
</template>

<script>
import {useSpecStore} from "@/store/SpecStore";

export default {
  name: "FullSpecInput",
  data() {
  },
  computed: {},
  methods: {
    handleInput(event) {
      this.specStore.setJoltSpec(event.target.value)
      this.specStore.updateBlocksFromJoltSpec()
    }
  },
  setup() {
    const specStore = useSpecStore()

    return {specStore}
  }
}
</script>

<style scoped>
.wrapper {
  /*background: lightseagreen;*/
  display: flex;
  margin-top: 10px;
  flex: 1;
}

textarea {
  flex: 1;
  height: 200px;
}

.wrapper div {
  flex: 1;
}

</style>