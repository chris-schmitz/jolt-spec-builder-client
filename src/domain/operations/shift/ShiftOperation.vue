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
import {computed, defineEmits, defineProps, reactive, ref, watch} from "vue";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import isValidJson from "@/utilities/JsonValidator";
import {ShiftBlockRenderData, ShiftUiBlock} from "@/domain/operations/shift/ShiftUiBlock";

const state = reactive({
  specContentString: {},
  passAlongOtherContent: true,
})
let badFormat = ref(false)

const props = defineProps<{ block: UIBlockOperation, index: number }>()
const shiftInstructionsString = computed(() => JSON.stringify(state.specContentString, null, 2))


watch(() => props.block, (newValue: ShiftUiBlock) => {
      state.specContentString = newValue.spec
      state.passAlongOtherContent = (newValue.renderData as ShiftBlockRenderData).passAlong as boolean

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
  const operation = rebuildUiBlockData(state.specContentString);
  notifyOfBlockUpdate(operation);
}

function saveContent(event: InputEvent) {
  const content = (event.target as HTMLTextAreaElement).value

  if (isValidJson(content)) {
    setBadFormat(false)
    const operation = rebuildUiBlockData(JSON.parse(content))
    notifyOfBlockUpdate(operation);
  } else {
    setBadFormat(true)
  }

}


function rebuildUiBlockData(shiftInstructions: object): ShiftUiBlock {
  return new ShiftUiBlock(shiftInstructions, {passAlong: state.passAlongOtherContent})
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