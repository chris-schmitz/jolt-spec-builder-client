<template>
  <div class="block-menu">
    <h1>Block menu</h1>
    <div class="block-container">
      <button
          class="block"
          v-for="block in state.blocks"
          v-text="block.label"
          v-bind:key="block.type"
          @click="insertBlock(block.type)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {RenderComponentTypes, useSpecStore} from "@/store/SpecStore";

const store = useSpecStore()

const state = reactive({
  // TODO: extract and normalize
  // * The concept of RenderBlocks (or whatever we want to call them) is emerging as an important idea
  // * we should pull this and all other blocky type concepts into a package and import them back in
  blocks: [
    {
      label: 'Raw Jolt',
      type: 'raw-jolt',
      template: {
        renderData: {},
        renderComponent: RenderComponentTypes.RAW,
      },
    },
    {
      label: 'Default',
      type: 'defaultr',
      template: {
        renderData: {},
        renderComponent: RenderComponentTypes.RAW,
      },
    },
    {
      label: 'Shift',
      type: 'shiftr',
      template: {
        operation: 'shift',
        spec: {
          renderData: {},
          renderComponent: RenderComponentTypes.RAW,
        },
      },
    },
    {
      label: 'Sort',
      type: 'sortr',
      template: {
        renderData: {},
        renderComponent: RenderComponentTypes.RAW,
      },
    },
    {
      label: 'Rename Column',
      type: 'renamer',
      template: {
        renderData: {},
        renderComponent: RenderComponentTypes.RAW,
      },
    },
    {
      label: 'Un-nest',
      type: 'unnester',
      template: {
        renderData: {},
        renderComponent: RenderComponentTypes.RAW,
      },
    },
    {
      label: 'Nest',
      type: 'nestr',
      template: {
        renderData: {},
        renderComponent: RenderComponentTypes.RAW,
      },
    },
    {
      label: 'Parsed Ingredients',
      type: 'shift',
      template: {
        operation: 'shift',
        renderComponent: RenderComponentTypes.PARSED_INGREDIENTS,
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
})

function insertBlock(type) {
  const block = state.blocks.filter((b) => b.type === type).pop();

  store.addBlock({index: store.nextIndex, operation: block.template})
  // this.spec.splice(this.spec.length, 0, block.template);
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