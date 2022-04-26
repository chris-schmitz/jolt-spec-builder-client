<template>
  <!--  TODO replace with a contenteditable div -->
  <div class="block-wrapper">
    <h2>Raw Operation</h2>
    <textarea :value="blockContent" @input="updateBlockContent"></textarea>
  </div>
  <!--  <p v-text="block"></p>-->
</template>

<script>
// TODO: add ts language and figure out how to correctly type the computed props
import {defineComponent} from "vue";

export default defineComponent({
  name: 'RawJolt',
  props: ['block', 'index'],
  computed: {
    blockContent: {
      get() {
        return JSON.stringify(this.block, null, 2)
      },
    },
  },
  methods: {
    updateBlockContent(event) {
      // this.blockContent = event.body
      this.$emit('updateBlock', {
        data: event.target.value,
        index: this.index,
      })
    },
  },
});
</script>

<style scoped>
.block-wrapper {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
}

textarea {
  flex: 1;
}
</style>