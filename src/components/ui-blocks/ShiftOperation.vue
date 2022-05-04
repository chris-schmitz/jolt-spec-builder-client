<template>
  <!--  TODO replace with a contenteditable div -->
  <div class="block-wrapper">
    <h2>Shift</h2>
    <textarea
        :value="shiftInstructionsString"
        @blur="saveContent"
        :class="{'bad-format': badFormat}"
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
import {defineProps, computed, watch, defineEmits, reactive, ref} from "vue";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

const state = reactive({
  shiftInstructions: {},
  passAlongOtherContent: true,
})
let badFormat = ref(false)

const props = defineProps<{ block: UIBlockOperation, index: number }>()
const shiftInstructionsString = computed(() => JSON.stringify(state.shiftInstructions, null, 2))


watch(() => props.block, (newValue: UIBlockOperation) => {
      state.shiftInstructions = newValue.spec
      state.passAlongOtherContent = newValue.renderData.passAlong as boolean

      if (isValidJson(JSON.stringify(state.shiftInstructions))) {
        setBadFormat(false)
      } else {
        setBadFormat(true)
      }
    },
    {immediate: true}
)

function setBadFormat(value: boolean) {
  badFormat.value = value
}

function togglePassAlong() {
  const operation = formatShiftOperation(state.shiftInstructions);
  notifyOfBlockUpdate(operation);
}

function saveContent(event: InputEvent) {
  const content = (event.target as HTMLTextAreaElement).value

  if (isValidJson(content)) {
    setBadFormat(false)
    const operation = formatShiftOperation(JSON.parse(content))
    notifyOfBlockUpdate(operation);
  } else {
    setBadFormat(true)
  }

}

// TODO: move out to utility file
function isValidJson(value: string): boolean {
  try {
    JSON.parse(value)
    return true
  } catch (error) {
    return false
  }
}

// TODO: move
// * move out to the shift tools, but only once things fit together. Really
// * stuff like intruducing typescript may resovle the need to move it, but even still
// * it seems like a "group like business logic" move
function formatShiftOperation(shiftInstructions: object): UIBlockOperation {
  return {
    operation: 'shift',
    renderComponent: UiBlockTypes.SHIFT,
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