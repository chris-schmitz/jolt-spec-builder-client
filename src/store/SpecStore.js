import {defineStore} from 'pinia'
import {formatForShiftComponent, formatForShiftJoltOperation} from '@/store/shape-transformations/shift.js'
import {formatForRawComponent} from "@/store/shape-transformations/raw.js";

export const RenderComponentTypes = {
  "RAW": "raw",
  "SHIFT": "shift"
}

// TODO: consider moving
// ? does it make sense to leave this logic in here, or would this be better
// ? placed in a utility file?
export const determineBlockComponent = (block) => {
  switch (block.renderComponent) {
    case 'shift':
      return 'ShiftOperation'
    default:
      return 'RawJolt'
  }
}


function transformSpecToBlocks(spec) {
  return spec
    .map(operation => {
      if (!("renderData" in operation)) {
        operation.renderData = {}
      }
      return operation
    })
    .map(object => {
      switch (object.renderComponent || object.operation) {
        case "shift":
          return formatForShiftComponent(object)
        case "default":
        case "sort":
        case "remove":
        case "cardinality":
          return formatForRawComponent(object)
        default:
          return formatForRawComponent(object)
      }
    })
}

function transformBlocksToSpec(blocks) {
  const spec = blocks
    .map(block => {
      switch (block.renderComponent) {
        case "shift":
          return formatForShiftJoltOperation(block)
        case "default":
        case "sort":
        case "remove":
        case "cardinality":
          return block
        default:
          return block
      }
    })
    .map(operation => {
      delete operation.renderData
      return operation
    })
  return JSON.stringify(spec, null, 2)
}

export const useSpecStore = defineStore('Spec Store', {
  state() {
    return {
      joltSpec: "",
      specBlocks: []
    }
  },
  actions: {
    setJoltSpec(spec) {
      this.joltSpec = spec
    },
    updateBlocksFromJoltSpec() {
      const spec = JSON.parse(this.joltSpec, null, 2)
      this.specBlocks = transformSpecToBlocks(spec)
    },
    updateJoltSpecFromBlocks() {
      const spec = transformBlocksToSpec(this.specBlocks)
      this.joltSpec = spec
    },
    updateBlock({operation, index}) {
      this.specBlocks.splice(index, 1, operation)
    }
    ,
    addBlock(block, index) {
      const targetIndex = index ? index : this.specBlocks.length
      this.specBlocks.splice(targetIndex, 0, block)
    }
  }
})