import { defineStore } from 'pinia'
import { formatForShiftComponent, formatForShiftJoltOperation } from '@/store/shape-transformations/shift'
import { formatForRawComponent } from '@/store/shape-transformations/raw'

export enum RenderComponentTypes {
  RAW = 'raw',
  SHIFT = 'shift',
  DEFAULT = 'default',
  SORT = 'sort',
  REMOVE = 'remove',
  CARDINALITY = 'cardinality',
}

// TODO: consider moving
// ? does it make sense to leave this logic in here, or would this be better
// ? placed in a utility file?
export const determineBlockComponent = (block: JoltOperation) => {
  switch (block.renderComponent) {
    case 'shift':
      return 'ShiftOperation'
    default:
      return 'RawJolt'
  }
}

function transformSpecToBlocks(spec: any) {
  return spec
    .map((operation: JoltOperation) => {
      if (!('renderData' in operation)) {
        operation.renderData = {}
      }
      return operation
    })
    .map((object: JoltOperation) => {
      switch (object.renderComponent || object.operation) {
        case 'shift':
          return formatForShiftComponent(object)
        case 'default':
        case 'sort':
        case 'remove':
        case 'cardinality':
          return formatForRawComponent(object)
        default:
          return formatForRawComponent(object)
      }
    })
}

export function transformBlocksToSpec(blocks: JoltOperation[]) {
  const spec = blocks
    .map((block: JoltOperation) => {
      switch (block.renderComponent) {
        case 'shift':
          return formatForShiftJoltOperation(block)
        case 'default':
        case 'sort':
        case 'remove':
        case 'cardinality':
          return block
        default:
          return block
      }
    })
    .map((operation) => {
      delete operation.renderData
      return operation
    })
  return JSON.stringify(spec, null, 2)
}

interface SpecStoreState {
  joltSpec: string
  specBlocks: any[]
}

export const useSpecStore = defineStore('Spec Store', {
  state(): SpecStoreState {
    return {
      joltSpec: '',
      specBlocks: [],
    }
  },
  actions: {
    // TODO: consider type change
    // ? should we accept this as a JoltOperation and convert it to a string?
    // * look at the places where this is being called and see what the type is naturally
    setJoltSpec(spec: string) {
      this.joltSpec = spec
    },
    updateBlocksFromJoltSpec() {
      const spec = JSON.parse(this.joltSpec)
      this.specBlocks = transformSpecToBlocks(spec)
    },
    updateJoltSpecFromBlocks() {
      const spec = transformBlocksToSpec(this.specBlocks)
      this.joltSpec = spec
    },
    updateBlock(payload: BlockUpdateRequest) {
      this.specBlocks.splice(payload.index, 1, payload.operation)
    },
    addBlock(payload: BlockUpdateRequest) {
      const { index, operation } = payload
      const targetIndex = index ? index : this.specBlocks.length
      this.specBlocks.splice(targetIndex, 0, operation)
    },
  },
})

// TODO: reorganize
// ? where should we put the interfaces? Don't like what I've done in the past, so
// ? read up on convention and follow
export interface BlockUpdateRequest {
  index: number
  operation: any
}

// TODO: consider breaking apart?
// * Right now, the concepts of Blocks (UI element ready form of the jolt operation) and Operations (the json jolt-compiler-friendly jolt operation)
// * are both covered in this interface because of the optionality of the block specific properties, namely the renderComponent and renderData properties
// * I can't decide if this is ok or if we should truley create a Block interface that extends the JoltOperation. For now I'm going to leave it (trying
// * not to abstract early ;P), but my spidey senses are telling me that this is an area we could hit a snag in
export interface JoltOperation {
  operation: string
  renderComponent?: RenderComponentTypes
  renderData?: any // TODO: come back and type this per render component needs -> base renderData abstract class with child classes per component type
  spec: any
}
