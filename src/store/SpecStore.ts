import {defineStore} from 'pinia'
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {convertBlockToSpecList, convertSpecListToBlocks, joltSpecDocToUiBlock} from "@/utilities/TransformationUtilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {BlockUpdateRequest} from "@/domain/ui-block/BlockUpdateRequest";


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
            // ! NOTE
            // * the use of index here may cause an issue with list rendering when
            // * we start doing things like reordering the list. we're using a UUID
            // * for the rendering key now, so it may be a good idea to switch this
            // * from an indexed splice to a lookup of the index based on uuid and
            // * then splicing
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


