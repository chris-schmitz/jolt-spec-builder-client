<!--https://github.com/bazaarvoice/jolt/blob/master/jolt-core/src/main/java/com/bazaarvoice/jolt/CardinalityTransform.java-->
<!-- Sample Input -->
<!--
{
  "family": {
    "people": [
      "Chris",
      "Ruthie",
      "Lily",
      "Ashlin",
      "Eliot"
    ]
  }
}
-->

<!--Sample Transformation -->
<!--
{
  "operation": "cardinality",
  "spec": {
    "family": {
      "people": "ONE"
    }
  }
}
-->

<template>
  <div class="block-wrapper">
    <h2>Single Cardinality Rule</h2>
    <input
        v-model="state.pathToKey"
        @blur="saveContent"
        :class="{'bad-format': badFormat}"
    >
    <select v-model="state.cardinalityType" @blur="saveContent">
      <option value="ONE">Convert list to single value</option>
      <option value="MANY">Convert single value to List</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, reactive, ref, watch} from "vue";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {CardinalityType} from "@/domain/operations/single-cardinality/Transformer";
import {SingleCardinalityRenderData, SingleCardinalityUiBlock} from "@/domain/operations/single-cardinality/UiBlock";

const state = reactive({
  pathToKey: "",
  cardinalityType: ""
})
let badFormat = ref(false)

const props = defineProps<{ block: UIBlockOperation, index: number }>()


// TODO: come back and make an interface per UI block type and then pass it through in all of the watchers
watch(() => props.block as SingleCardinalityUiBlock, (block: SingleCardinalityUiBlock) => {
      // * transform block json to dot notation path
      state.pathToKey = (block.renderData as SingleCardinalityRenderData).targetKeyPath
      state.cardinalityType = (block.renderData as SingleCardinalityRenderData).cardinalityType
    },
    {immediate: true}
)

function setBadFormat(value: boolean) {
  badFormat.value = value
}

function isValidDotNotation(content: string) {
  // TODO: consider either refactoring or removing
  // * how do you validate dot notation? Since json and javascript object keys can be any string
  // * it seems like ANYTHING that's a string can be a valid path, especially considering a key
  // * at a root level wouldn't look anything like a dot notation path. We know it needs to be a
  // * string, but we're using typescript so really a type check would be enough, like even the
  // * typecheck on this validation method would seemingly be enough b/c it would throw an exception
  // * if we passed it anything BUT a string, but is that really practical? enough? needed at all?
  // * I mean really it seems like the only way this isn't really good is if we specify no path b/c
  // * it would mean that the transformation isn't actually needed.
  return content !== ""
}

function saveContent() {

  if (isValidDotNotation(state.pathToKey)) {
    setBadFormat(false)
    notifyOfBlockUpdate(rebuildUiBlockData());
  } else {
    setBadFormat(true)
  }

}

function rebuildUiBlockData(): SingleCardinalityUiBlock {
  return new SingleCardinalityUiBlock({}, {
    targetKeyPath: state.pathToKey,
    cardinalityType: state.cardinalityType as CardinalityType
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