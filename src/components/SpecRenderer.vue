<template>
  <div class="renderer-wrapper">
    <component
        v-for="(block, index) in uiBlocks"
        v-bind:key="index"
        :block="block"
        :index="index"
        :is="determineBlockComponent(block)"
        @block-operation-updated="updateBlock"
    >
    </component>
  </div>
</template>

<script lang="ts" setup>
import {useSpecStore} from '@/store/SpecStore';
import {computed, onBeforeMount} from "vue";
import {BlockUpdateRequest, convertBlockToSpecList, determineBlockComponent} from "@/domain/ui-block/UiBlockUtilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import RawJolt from "@/components/ui-blocks/RawJolt.vue"
import ShiftOperation from "@/components/ui-blocks/ShiftOperation.vue"
import {mapState} from "pinia";

class TransformationRequest {
  private input: string
  private specList: JoltOperation[]

  constructor(input: string, specList: JoltOperation[]) {
    this.input = input;
    this.specList = specList;
  }

  toString() {
    // return JSON.stringify({"input": this.input, "spec": JSON.stringify(this.specList)})
    return `{"input": "${this.input}", "spec": "${JSON.stringify(this.specList).replace('"', "\"")}"`
  }
}

const
    store = useSpecStore();

const
    uiBlocks = computed(() => store.specBlockList)

// TODO: how do we want to organize this?
// ? now that we're using the composition API we have a lot more freedom re: organizing business logic
// ? which is great, but how do we want to do it?  What's clean and readable? right now let's just roughly
// ? group it in file while converting to composition API from option API, but after that, consider how it
// ? should be organized and what can be extracted from the file

// ^ ==== Store Operations ==== ^ //
function

updateBlocks() {
  if (store.joltSpecList.length > 0) {
    store.updateBlocksFromJoltSpec()
  }
}


function

runTransformation() {
  const specList = convertBlockToSpecList(store.specBlockList)
  _submitSpecAndInput(new TransformationRequest(store.input, specList))
}

async function

_submitSpecAndInput(request: TransformationRequest) {
  const response = await fetch('http://localhost:8080/transform', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: request.toString()
  });
  return await response.json();
}

// ^ ==== Block logic ==== ^ //
function

updateBlock(event: BlockUpdateRequest) {
  store.updateBlock(event);
  runTransformation()
}

// ^ ==== Life cycle hooks ==== ^ //
onBeforeMount(updateBlocks)
</script>

<style scoped>

.renderer-wrapper {
  height: 90vh;
  overflow-y: scroll;
}

.spec-block {
  background: lightseagreen;
  display: flex;
  margin-top: 10px;
}

.spec-block * {
  flex: 1;
}
</style>