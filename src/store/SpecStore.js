import {defineStore} from 'pinia'

export const RenderComponentTypes = {
  "RAW": "raw",
  "SHIFT": "shift"
}

function formatForRawComponent(operation) {
  operation.renderComponent = RenderComponentTypes.RAW
  return operation
}

function formatForShiftComponent(operation) {
  operation.renderComponent = RenderComponentTypes.SHIFT
  if ("@" in operation.spec || "@1" in operation.spec) {
    operation.renderData.passAlong = true
    delete operation.spec["@"]
    delete operation.spec["@1"]
  } else {
    operation.renderData.passAlong = false
  }
  return operation;
}

function transformSpecToBlocks(spec) {
  const specJson = JSON.parse(spec, null, 2)

  const blocksArray = specJson
    .map(operation => {
      if (!("renderData" in operation)) {
        operation.renderData = {}
      }
      return operation
    })
    .map(object => {
      switch (object.renderComponent) {
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


export const useSpecStore = defineStore('spec', {
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
      this.specBlocks = JSON.parse(this.joltSpec, null, 2)
    },
    updateJoltSpecFromBlocks() {
      this.joltSpec = JSON.stringify(this.specBlocks, null, 2)
    },
    addBlock(block, index) {
      const targetIndex = index ? index : this.specBlocks.length
      this.specBlocks.splice(targetIndex, 0, block)
    }
  }
})