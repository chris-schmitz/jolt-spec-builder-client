<template>
  <div class="renderer-wrapper">
    <component
        v-for="(block, index) in store.specBlocks"
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
import {onBeforeMount} from "vue";
import {BlockUpdateRequest, determineBlockComponent} from "@/domain/ui-block/UiBlockUtilities";

const store = useSpecStore();

// TODO: how do we want to organize this?
// ? now that we're using the composition API we have a lot more freedom re: organizing business logic
// ? which is great, but how do we want to do it?  What's clean and readable? right now let's just roughly
// ? group it in file while converting to composition API from option API, but after that, consider how it
// ? should be organized and what can be extracted from the file

// ^ ==== Store Operations ==== ^ //
function updateBlocks() {
  if (store.joltSpec) store.updateBlocksFromJoltSpec();
}


// ^ ==== Block logic ==== ^ //
function updateBlock(event: BlockUpdateRequest) {
  store.updateBlock(event);
  //  TODO next steps:
  //  - format the blocks as a spec in a variable
  //  - pull the input and fire the API call
  //  - throw the output in output
  //  ! DON'T update the jolt spec in the store
}

// ^ ==== Life cycle hooks ==== ^ //
onBeforeMount(updateBlocks)
</script>

<style scoped>
.spec-block {
  background: lightseagreen;
  display: flex;
  margin-top: 10px;
}

.spec-block * {
  flex: 1;
}
</style>