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

const store = useSpecStore()

interface UiBlockButton {
  label: string
  type: string  // TODO: put behind an enum?
  template: UIBlockOperation
}

const blockButtons: UiBlockButton[] = [
  {
    label: 'Raw Jolt',
    type: 'raw-jolt',
    template: {
      operation: "",
      spec: {},
      renderData: {},
      renderComponent: UiBlockTypes.RAW,
    },
  },
  {
    label: 'Default',
    type: 'defaultr',
    template: {
      operation: "default",
      spec: {},
      renderData: {},
      renderComponent: UiBlockTypes.RAW,
    },
  },
  {
    label: 'Shift',
    type: 'shiftr',
    template: {
      operation: 'shift',
      renderComponent: UiBlockTypes.SHIFT,
      renderData: {},
      spec: {},
    },
  },
  {
    label: 'Sort',
    type: 'sortr',
    template: {
      operation: 'shift',
      renderData: {},
      renderComponent: UiBlockTypes.RAW,
      spec: {}
    },
  },
  {
    label: 'Rename Column',
    type: 'renamer',
    template: {
      renderData: {},
      operation: "rename",
      spec: {},
      renderComponent: UiBlockTypes.RAW,
    },
  },
  {
    label: 'Parsed Ingredients',
    type: 'shift',
    template: {
      operation: 'shift',
      renderComponent: UiBlockTypes.PARSED_INGREDIENTS,
      renderData: {},
      spec: {
        "@": "",
        "ingredientSection": {
          "ingredients": "new_ingredients_section"
        }
      },
    }
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
  store.addBlock({index: store.nextIndex, operation})
}

</script>

<style scoped>
.block-menu {
  /*flex: 1;*/
  display: flex;
  flex-direction: column;
  /*background: orangered;*/
  /*justify-content: space-around;*/
}

.block-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /*background: pink;*/
  flex: 1;
}

.block {
  /*border: 1px solid red;*/
  /*background: lightblue;*/
  flex: 0 0 80px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>