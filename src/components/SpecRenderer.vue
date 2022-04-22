<template>
  <div>
    joltSpec
    {{ store.specBlocks }}
  </div>
</template>

<script>
import {useSpecStore} from "@/store/SpecStore.js";


export default {
  name: "SpecPanel",
  data() {
    return {}
  },
  setup() {
    console.log(useSpecStore)
    const store = useSpecStore()
    return {
      store
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