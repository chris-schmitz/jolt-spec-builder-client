import {defineStore} from 'pinia'
import {BlockUpdateRequest, convertBlockToSpec, convertSpecListToBlocks} from "@/domain/ui-block/UiBlockUtilities";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {joltSpecDocToUiBlock} from "@/domain/jolt-spec/Utilities";


interface SpecStoreState {
    joltSpec: string
    specBlocks: UIBlockOperation[]
}

export const useSpecStore = defineStore('Spec Store', {
    state(): SpecStoreState {
        return {
            joltSpec: '',
            specBlocks: [],
        }
    },
    getters: {
        nextIndex: (state: SpecStoreState) => state.specBlocks.length
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
            this.specBlocks = convertSpecListToBlocks(spec)
        },
        updateJoltSpecFromBlocks() {
            const spec = convertBlockToSpec(this.specBlocks)
            this.joltSpec = spec
        },
        updateBlock(payload: BlockUpdateRequest) {
            this.specBlocks.splice(payload.index, 1, payload.operation)
        },
        addBlock(payload: BlockUpdateRequest) {
            const {index, operation} = payload
            const block = joltSpecDocToUiBlock(operation)
            const targetIndex = index ? index : this.specBlocks.length
            this.specBlocks.splice(targetIndex, 0, block)
        },
    },
})


