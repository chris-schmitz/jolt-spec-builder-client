<template>
  <!--  TODO replace with a contenteditable div -->
  <div class="block-wrapper">
    <h2>Raw Operation</h2>
    <textarea :value="blockContent" @input="updateBlockContent"></textarea>
  </div>
  <!--  <p v-text="block"></p>-->
</template>

<script lang="ts" setup>
// TODO: add ts language and figure out how to correctly type the computed props
import {computed, defineProps, defineEmits} from "vue";

const props = defineProps<{ block: object, index: number }>()
const blockContent = computed(() => JSON.stringify(props.block, null, 2))

const blockUpdateEmit = defineEmits("updateBlock")

function updateBlockContent(event: InputEvent) {
  blockUpdateEmit({
    data: event.target.value,
    index: this.index,
  })
}
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