import {defineStore} from 'pinia'
import {BlockUpdateRequest, convertBlockToSpecList, convertSpecListToBlocks} from "@/domain/ui-block/UiBlockUtilities";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {joltSpecDocToUiBlock} from "@/domain/jolt-spec/Utilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";


interface SpecStoreState {
    input: string,
    output: string,
    joltSpecList: JoltOperation[]
    specBlockList: UIBlockOperation[]
}

export const useSpecStore = defineStore('Spec Store', {
    state(): SpecStoreState {
        return {
            input: "",
            output: "",
            joltSpecList: [],
            specBlockList: [],
        }
    },
    getters: {
        nextIndex: (state: SpecStoreState) => state.specBlockList.length,
    },
    actions: {
        setJoltSpec(spec: JoltOperation[]) {
            this.joltSpecList = spec
        },
        updateBlocksFromJoltSpec() {
            this.specBlockList = convertSpecListToBlocks(this.joltSpecList)
        },
        updateJoltSpecFromBlocks() {
            this.joltSpecList = convertBlockToSpecList(this.specBlockList)
        },
        updateBlock(payload: BlockUpdateRequest) {
            this.specBlockList.splice(payload.index, 1, payload.operation)
        },
        addBlock(payload: BlockUpdateRequest) {
            const {index, operation} = payload
            const block = joltSpecDocToUiBlock(operation)
            const targetIndex = index ? index : this.specBlockList.length
            this.specBlockList.splice(targetIndex, 0, block)
        }
    },
})


