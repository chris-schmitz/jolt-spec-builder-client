<template>
  <div class="block-wrapper">
    <h2>Remove</h2>
    <textarea
        :value="specContentString"
        @blur="saveContent"
        :class="{'bad-format': badFormat}"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps, reactive, ref, watch} from "vue";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {joltSpecDocToUiBlock} from "@/utilities/TransformationUtilities";
import isValidJson from "@/utilities/JsonValidator";

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


function formatOperation(spec: object): UIBlockOperation {
  return joltSpecDocToUiBlock({
    operation: "remove",
    renderComponent: UiBlockTypes.REMOVE,
    spec
  })
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