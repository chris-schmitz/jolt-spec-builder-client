<template>
  <div class="block-menu">
    <h1>Block menu</h1>
    <div class="block-container">
      <button
          class="block"
          v-for="(block, index) in state.blocks"
          v-text="block.label"
          v-bind:key="index"
          @click="insertBlock(block)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {useSpecStore} from "@/store/SpecStore";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import ShiftMenuItem from "@/domain/operations/shift/BlockMenuItem"
import SingleCardinalityMenuItem from "@/domain/operations/single-cardinality/BlockMenuItem"
import RemoveMenuItem from "@/domain/operations/remove/BlockMenuItem"
import RawMenuItem from "@/domain/operations/raw/BlockMenuItem"
import SmartLabelNutritionMenuItem from "@/domain/li-operations/smartlabel-nutrition/BlockMenuItem"
import DefaultMenuItem from "@/domain/operations/default/BlockMenuItem"
import CoreProductMenuItem from "@/domain/li-operations/core-product/BlockMenuItem"
import RekeyPropertyMenuItem from "@/domain/operations/rekey-property/BlockMenuItem"


const store = useSpecStore()

interface UiBlockButton {
  label: string
  template: UIBlockOperation
}


const blockButtons: UiBlockButton[] = [
  SingleCardinalityMenuItem,
  ShiftMenuItem,
  RemoveMenuItem,
  RawMenuItem,
  SmartLabelNutritionMenuItem,
  DefaultMenuItem,
  CoreProductMenuItem,
  RekeyPropertyMenuItem
]

const state = reactive({blocks: blockButtons})

function insertBlock(block: UiBlockButton) {
  const operation = JSON.parse(JSON.stringify(block.template))
  const index = store.nextIndex
  store.addBlock({index, operation})
}

</script>

<style scoped>
.block-menu {
  display: flex;
  flex-direction: column;
}

.block-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
}

.block {
  flex: 0 0 80px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>