<template>
  <!--  TODO replace with a contenteditable div -->
  <div class="block-wrapper">
    <h2>Raw Operation</h2>
    <textarea :value="state.renderData" @input="updateBlockContent"></textarea>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, reactive, watch} from "vue";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {BlockRenderData} from "@/domain/ui-block/UiBlockUtilities";

const state = reactive({
  renderData: {},
})

const props = defineProps<{ block: UIBlockOperation, index: number }>()

const emit = defineEmits(["block-operation-updated"])


let operation: string,
    spec: object,
    renderComponent: UiBlockTypes,
    renderData: BlockRenderData

function formatForRender(block: UIBlockOperation) {
  const bblock = JSON.parse(JSON.stringify(block));
  ({operation, spec, renderComponent, renderData} = bblock)
  return JSON.stringify({operation, spec}, null, 2)
}

function formatForStorage(blockString: string): UIBlockOperation {
  const block = JSON.parse(blockString)
  block.renderComponent = renderComponent
  block.renderData = renderData
  return block
}

watch(() => props.block, (newValue) => {
  state.renderData = formatForRender(newValue)
}, {immediate: true})

function updateBlockContent(event: InputEvent) {
  let operation = formatForStorage((event.target as HTMLTextAreaElement).value)
  emit("block-operation-updated", {
    operation,
    index: props.index,
  })
}
</script>

<style scoped>
.block-wrapper {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 200px;
}

textarea {
  flex: 1;
}
</style>