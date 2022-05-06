<template>
  <div class="block-menu">
    <h1>Block menu</h1>
    <div class="block-container">
      <button
          class="block"
          v-for="block in state.blocks"
          v-text="block.label"
          v-bind:key="block.type"
          @click="insertBlock(block)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {useSpecStore} from "@/store/SpecStore";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {joltSpecDocToUiBlock} from "@/utilities/TransformationUtilities";

const store = useSpecStore()

interface UiBlockButton {
  label: string
  type: string  // TODO: put behind an enum?
  template: UIBlockOperation
}


// TODO: consider how this information is stored
// * right now it's functional to keep it here, but now we have multiple places that the app needs to be aware of each of the UI blocks.
// * It feels like if we take a big refactor-cleanup sweep through the codebase (which we should), each of these objects should exist in
// * each of their specific domains, e.g. the Shift UIBlockButton should come from a module export in `src/domain/transformations/shift/...`.
// * Each transformation could export their UiBlockButton data and we could import them all here explicitly or do some kind of export index
// * index in `src/domain/transformations/exports.ts` so we could do a dynamic import
const blockButtons: UiBlockButton[] = [
  {
    label: 'Raw Jolt',
    type: 'raw-jolt',
    template: joltSpecDocToUiBlock({
      operation: "<FILL IN DESIRED OPERATION>",
      spec: {},
      renderComponent: UiBlockTypes.RAW,
    }),
  },
  {
    label: 'Default',
    type: 'defaultr',
    template: joltSpecDocToUiBlock({
      operation: "default",
      spec: {},
      renderComponent: UiBlockTypes.DEFAULT,
    })
  },
  {
    label: 'Shift',
    type: 'shiftr',
    template: joltSpecDocToUiBlock({
      operation: 'shift',
      renderComponent: UiBlockTypes.SHIFT,
      spec: {},
    })
  },
  {
    label: 'Single Cardinality',
    type: 'single',
    template: joltSpecDocToUiBlock({
      operation: 'shift',
      renderComponent: UiBlockTypes.SHIFT,
      spec: {},
    })
  },
  {
    label: 'Remove',
    type: 'remove',
    template: joltSpecDocToUiBlock({
      operation: 'remove',
      renderComponent: UiBlockTypes.REMOVE,
      spec: {},
    })
  },
  // {
  //   label: 'Sort',
  //   type: 'sortr',
  //   template: joltSpecDocToUiBlock({
  //     operation: 'shift',
  //     renderComponent: UiBlockTypes.RAW,
  //     spec: {}
  //   })
  // },
  {
    label: 'Parsed Ingredients',
    type: 'shift',
    template: joltSpecDocToUiBlock({
      operation: 'shift',
      renderComponent: UiBlockTypes.PARSED_INGREDIENTS,
      spec: {
        "@": "",
        "ingredientSection": {
          "ingredients": "new_ingredients_section"
        }
      },
    })
  },
]

const
    state = reactive({
      // TODO: extract and normalize
      // * The concept of RenderBlocks (or whatever we want to call them) is emerging as an important idea
      // * we should pull this and all other blocky type concepts into a package and import them back in
      blocks: blockButtons

    })

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