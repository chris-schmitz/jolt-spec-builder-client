<template>
  <div class="wrapper">
    <textarea :value="specBlocks" @input="specBlocks = $event.target.value"></textarea>
    <div style="background: white">{{ JSON.stringify(spec, null, 2) }}</div>
  </div>
</template>

<script>
import sharedState from '@/store/shared-state.js'

export default {
  name: "FullSpecInput",
  data() {
    return {
      spec: sharedState.specBlocks
    }
  },
  computed: {
    specBlocks: {
      get() {
        return JSON.stringify(this.spec, null, 2)
      },
      set(value) {
        // * this feels hacky, but it's the only way I was able to get it to work re: reactivity
        this.spec.splice(0, this.spec.length, ...JSON.parse(value, null, 2))
      }
    }
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