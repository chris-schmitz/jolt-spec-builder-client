<template>
  <div class="block-wrapper">
    <h2>Default</h2>
    <textarea
        :value="specContentString"
        @blur="saveContent"
        :class="{'bad-format': badFormat}"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, computed, watch, defineEmits, reactive, ref} from "vue";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

const state = reactive({
  specContentString: {},
})
let badFormat = ref(false)

const props = defineProps<{ block: UIBlockOperation, index: number }>()
const specContentString = computed(() => JSON.stringify(state.specContentString, null, 2))


watch(() => props.block, (newValue: UIBlockOperation) => {
      state.specContentString = newValue.spec

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

// TODO: move out to utility file
function isValidJson(value: string): boolean {
  try {
    JSON.parse(value)
    return true
  } catch (error) {
    return false
  }
}

// TODO: consider need
// ? why are we rebuilding the block shape here??
function formatOperation(shiftInstructions: object): UIBlockOperation {
  // props.block but merge in changes
  return {
    id: "",
    operation: 'shift',
    renderComponent: UiBlockTypes.DEFAULT,
    renderData: {},
    spec: shiftInstructions
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