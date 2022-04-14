<template>
  <!--  TODO replace with a contenteditable div -->
  <textarea :value="blockContent" @input="updateBlockContent"></textarea>
  <!--  <p v-text="block"></p>-->
</template>

<script>
export default {
  name: "RawJolt",
  props: ['block', 'index'],
  computed: {
    blockContent: {
      get() {
        return JSON.stringify(this.block, null, 2)
      }
    }
  },
  methods: {
    updateBlockContent(event) {
      // this.blockContent = event.body
      this.$emit("updateBlock", {data: event.target.value, index: this.index})
    }
  }
}
</script>

<style scoped>

</style>