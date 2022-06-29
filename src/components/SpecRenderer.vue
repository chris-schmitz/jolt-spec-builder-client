<template>
  <div class="renderer-wrapper">
    <div
        v-for="(block,index) in store.specBlockList"
        :key="block.id"
    >
      <button
          @click="toggleDisableForBlock(block)"
      >
        Disable
      </button>
      <component
          :block="block"
          :index="index"
          :is="determineBlockComponent(block)"
          @block-operation-updated="updateSingleBlock"
          :class="blockIsDisabled(block)"
      >
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useSpecStore} from '@/store/SpecStore';
import {onBeforeMount} from "vue";
import {determineBlockComponent} from "@/domain/ui-block/UiBlockUtilities";
import {convertBlockToSpecList} from "@/utilities/TransformationUtilities";
import {BlockUpdateRequest} from "@/domain/ui-block/BlockUpdateRequest";
import {specSubmitter} from "@/main"
import {AllBlocksGetThisRenderData, UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";


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

// ^ ==== Block logic ==== ^ //
const blockIsDisabled = (block: UIBlockOperation) => {
  return {
    'disabled-block':
    (block.renderData as AllBlocksGetThisRenderData).disabled
  }
}

function toggleDisableForBlock(block) {
  store.disableBlock(block)
  const specList = convertBlockToSpecList(store.specBlockList)
  specSubmitter.runTransformation(specList)
}

async function updateSingleBlock(event: BlockUpdateRequest) {
  store.updateBlock(event);
  const specList = convertBlockToSpecList(store.specBlockList)
  specSubmitter.runTransformation(specList)
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

.disabled-block {
  background: gray;
}

</style>