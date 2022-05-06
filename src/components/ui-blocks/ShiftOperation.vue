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
import {joltSpecDocToUiBlock} from "@/utilities/TransformationUtilities";
import isValidJson from "@/utilities/JsonValidator";

const state = reactive({
  specContentString: {},
  passAlongOtherContent: true,
})
let badFormat = ref(false)

const props = defineProps<{ block: UIBlockOperation, index: number }>()
const shiftInstructionsString = computed(() => JSON.stringify(state.specContentString, null, 2))


watch(() => props.block, (newValue: UIBlockOperation) => {
      state.specContentString = newValue.spec
      state.passAlongOtherContent = newValue.renderData.passAlong as boolean

      if (isValidJson(JSON.stringify(state.specContentString))) {
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
  const operation = formatOperation(state.specContentString);
  notifyOfBlockUpdate(operation);
}

function saveContent(event: InputEvent) {
  const content = (event.target as HTMLTextAreaElement).value

  if (isValidJson(content)) {
    setBadFormat(false)
    const operation = formatOperation(JSON.parse(content))
    notifyOfBlockUpdate(operation);
  } else {
    setBadFormat(true)
  }

}


function formatOperation(shiftInstructions: object): UIBlockOperation {
  const uiBlock = joltSpecDocToUiBlock({
    operation: "shift",
    renderComponent: UiBlockTypes.SHIFT,
    spec: shiftInstructions
  })
  uiBlock.renderData.passAlong = state.passAlongOtherContent
  return uiBlock
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