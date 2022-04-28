<template>
  <!--  TODO replace with a contenteditable div -->
  <div class="block-wrapper">
    <h2>Shift</h2>
    <textarea
        :value="shiftInstructionsString"
        @input="saveContent"
    ></textarea>
    <label for="pass-along"
    >Pass along other data to next operation:
      <input
          type="checkbox"
          id="pass-along"
          v-model="state.passAlongOtherContent"
          @change="togglePassAlong"
      /></label>
  </div>
</template>

<script lang="ts" setup>
import {JoltOperation, RenderComponentTypes} from '@/store/SpecStore';
import {ref, defineProps, computed, watch, defineEmits, reactive} from "vue";

const state = reactive({
  shiftInstructions: "",
  passAlongOtherContent: true
})
const props = defineProps<{ block: object, index: number }>()
const shiftInstructionsString = computed(() => JSON.stringify(state.shiftInstructions, null, 2))


watch(props.block, (newValue) => {
      state.shiftInstructions = newValue.spec
      state.passAlongOtherContent = newValue.renderData.passAlong
    },
    {immediate: true}
)

function togglePassAlong() {
  const operation = formatShiftOperation(state.shiftInstructions);
  notifyOfBlockUpdate(operation);
}

// TODO: UUUUGH figure out the type for this DOM event !!!
function saveContent(event: any) {
  const operation = formatShiftOperation(
      JSON.parse(event.target.value)
  )
  notifyOfBlockUpdate(operation);
}

// TODO: move
// * move out to the shift tools, but only once things fit together. Really
// * stuff like intruducing typescript may resovle the need to move it, but even still
// * it seems like a "group like business logic" move
function formatShiftOperation(shiftInstructions: any): JoltOperation {
  return {
    operation: 'shift',
    renderComponent: RenderComponentTypes.SHIFT,
    renderData: {
      passAlong: state.passAlongOtherContent,
    },
    spec: shiftInstructions,
  };
}

const emit = defineEmits(['block-operation-updated'])

function notifyOfBlockUpdate(operation: JoltOperation) {
  emit('block-operation-updated', {
    index: props.index,
    operation,
  });
}

</script>

<style scoped>
textarea {
  flex: 1;
}

.block-wrapper {
  height: 200px;
  /*width: 90%;*/
  display: flex;
  flex-direction: column;
}
</style>