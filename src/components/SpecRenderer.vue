<template>
  <div class="renderer-wrapper">
    <component
        v-for="(block,index) in store.specBlockList"
        v-bind:key="block.id"
        :block="block"
        :index="index"
        :is="determineBlockComponent(block)"
        @block-operation-updated="updateSingleBlock"
    >
    </component>
  </div>
</template>

<script lang="ts" setup>
import {useSpecStore} from '@/store/SpecStore';
import {onBeforeMount} from "vue";
import {BlockUpdateRequest, determineBlockComponent} from "@/domain/ui-block/UiBlockUtilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {convertBlockToSpecList} from "@/utilities/TransformationUtilities";


class TransformationRequest {
  private input: string
  private specList: JoltOperation[]

  constructor(input: string, specList: JoltOperation[]) {
    this.input = input;
    this.specList = specList;
  }

  toString() {
    const spec = JSON.stringify(this.specList)
    const input = this.input
    return JSON.stringify({input, spec})
  }
}

const store = useSpecStore();

// TODO: how do we want to organize this?
// ? now that we're using the composition API we have a lot more freedom re: organizing business logic
// ? which is great, but how do we want to do it?  What's clean and readable? right now let's just roughly
// ? group it in file while converting to composition API from option API, but after that, consider how it
// ? should be organized and what can be extracted from the file

// ^ ==== Store Operations ==== ^ //
function updateBlocks() {
  if (store.joltSpecList.length > 0) {
    store.updateBlocksFromJoltSpec()
  }
}


async function runTransformation() {
  const specList = convertBlockToSpecList(store.specBlockList)
  store.output = await _submitSpecAndInput(new TransformationRequest(store.input, specList))
}

async function _submitSpecAndInput(request: TransformationRequest) {
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
function updateSingleBlock(event: BlockUpdateRequest) {
  store.updateBlock(event);
  runTransformation()
}

// ^ ==== Life cycle hooks ==== ^ //
onBeforeMount(updateBlocks)
</script>

<style>
/*! Note that this is specifically style unscoped to this component, so it will cascade like normal css! */
/*^ I don't really consider this hacky b/c it's how css is supposed to work, but in terms of not scoping style to a component
  ^ in order to target children and the double style tag stuff it's def not typical vue stuff, so it's at least worth calling out
^*/
.bad-format {
  background: #FFB4C0;
  border: 2px solid orangered;
}
</style>

<style scoped>

.renderer-wrapper {
  flex: 1;
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