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
import {joltSpecDocToUiBlock} from "@/utilities/TransformationUtilities";
//? convert the js files to ts???
import shiftTemplate from "@/domain/operations/shift/template"
import removeTemplate from "@/domain/operations/remove/template"
import rawTemplate from "@/domain/operations/raw/template"
import defaultTemplate from "@/domain/operations/default/template"
import parsedIngredientTemplate from "@/domain/operations/parsed-ingredients/template"
import singleCardinalityTemplate from "@/domain/operations/single-cardinality/template"
import coreProductTemplate from "@/domain/li-operations/core-product/template"

const store = useSpecStore()

interface UiBlockButton {
  label: string
  template: UIBlockOperation
}


const blockButtons: UiBlockButton[] = [
  {
    label: 'Raw Jolt',
    template: joltSpecDocToUiBlock(rawTemplate),
  },
  {
    label: 'Default',
    template: joltSpecDocToUiBlock(defaultTemplate)
  },
  {
    label: 'Shift',
    template: joltSpecDocToUiBlock(shiftTemplate)
  },
  {
    label: 'Single Cardinality',
    template: joltSpecDocToUiBlock(singleCardinalityTemplate)
  },
  {
    label: 'Remove',
    template: joltSpecDocToUiBlock(removeTemplate)
  },
  {
    label: 'Parsed Ingredients',
    template: joltSpecDocToUiBlock(parsedIngredientTemplate)
  },
  {
    label: "Core Product",
    template: joltSpecDocToUiBlock(coreProductTemplate)
  }
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