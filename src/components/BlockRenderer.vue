<template>
  <div class="renderer-wrapper">
    <div
        v-for="(block,index) in store.uiBlockOperationList"
        :key="block.id"
        class="block"
        :class="blockIsDisabled(block)"
    >
      <div class="button-group">
        <button class="disable-button" @click="toggleDisableForBlock(block)">
          Disable
        </button>
        <button class="delete-button" @click="deleteBlock(block)">
          Delete
        </button>
      </div>
      <component
          :block="block"
          :index="index"
          :is="determineBlockComponent(block)"
          @block-operation-updated="updateSingleBlock"
      >
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount} from "vue";
import {determineBlockComponent} from "@/domain/ui-block/UiBlockUtilities";
import {getBlockRenderTools} from "@/components/BlockRenderer";
import {useSpecStore} from "@/store/SpecStore";

const store = useSpecStore()

const {deleteBlock, blockIsDisabled, updateBlocks, updateSingleBlock} = getBlockRenderTools()

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

.block {
  /*background: lightseagreen;*/
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  border: 1px solid lightgray;
}

/*.spec-block * {*/
/*  flex: 1;*/
/*}*/

.disabled-block {
  background: gray;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

.button-group button {
  margin-right: 10px;
  padding: 5px;
}

.disable-button {
  background: darkgray;
}

.delete-button {
  background: red;
}

</style>