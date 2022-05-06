<template>
  <div class="block-wrapper">
    <h2>Single Cardinality Rule</h2>
    <input
        :value="specContentString"
        @blur="saveContent"
        :class="{'bad-format': badFormat}"
    >
    <select v-model="state.cardinalityType">
      <option value="ONE">Convert to single value</option>
      <option value="MANY">Convert to a List</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, computed, watch, defineEmits, reactive, ref} from "vue";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

const state = reactive({
  specContentString: {},
  cardinalityType: ""
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
  const content = (event.target as HTMLInputElement).value

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

// TODO: easy refactor: formatOperation
function formatOperation(specContent: object): UIBlockOperation {
  return {
    id: "",
    operation: 'cardinality',
    renderComponent: UiBlockTypes.SINGLE_CARDINALITY,
    renderData: {
      cardinalityType: state.cardinalityType
    },
    spec: specContent
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