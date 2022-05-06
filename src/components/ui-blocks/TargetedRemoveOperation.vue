<!--
  * Make this one a dumb targets remove where
  - the ui block version is a list of inputs using dot notation to specify what to remove
  - the jolt version is a spec with the individual paths merged
  ! note that you can't specify duplicate keys, so matching dot notation paths would need to be merge
  * dot -> object could be "walk each dot notation entry and construct the object, looking for existing keys" kind of like mkdir -p
  * object -> dot could be recursively dive into an object looking for leaves, once you hit a leaf that recursive pipe becomes a dot notation entry
  * actually I don't know if recursion would work best or just looping, or recursing with shared state mutations :shrug:, may need to get hacky
-->


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
    id: "",
    operation: 'shift',
    renderComponent: UiBlockTypes.SHIFT,
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