<template>
  <!--  todo: consider if this is the best place to blur-->
  <div class="block-wrapper"
  >
    <h2>Re-key Property</h2>
    <input
        v-model="state.pathToKey"
        :class="{'bad-format': badFormat}"
        @blur="saveContent"
    >
    <input
        v-model="state.newKey"
        @blur="saveContent"
    >
    <label for="pass-along"
    >Pass along other data to next operation:
      <input
          type="checkbox"
          id="pass-along"
          v-model="state.passAlongOtherContent"
          @change="saveContent"
      />
    </label>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, reactive, ref, watch} from "vue";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {RekeyPropertyRenderData, RekeyPropertyUiBlock} from "@/domain/operations/rekey-property/RekeyPropertyUiBlock";

const state = reactive({
  pathToKey: "",
  newKey: "",
  passAlongOtherContent: true
})
let badFormat = ref(false)

const props = defineProps<{ block: UIBlockOperation, index: number }>()


watch(() => props.block as RekeyPropertyUiBlock, (block: RekeyPropertyUiBlock) => {
      // * transform block json to dot notation path
      state.pathToKey = (block.renderData as RekeyPropertyRenderData).targetKeyPath
      state.newKey = (block.renderData as RekeyPropertyRenderData).newKey
      state.passAlongOtherContent = (block.renderData as RekeyPropertyRenderData).passAlong
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

function rebuildUiBlockData(): RekeyPropertyUiBlock {
  return new RekeyPropertyUiBlock({}, {
    targetKeyPath: state.pathToKey,
    newKey: state.newKey,
    passAlong: state.passAlongOtherContent
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