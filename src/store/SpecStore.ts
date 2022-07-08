import {defineStore} from 'pinia'
import {AllBlocksGetThisRenderData, UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {convertBlockToSpecList, convertSpecListToBlocks, joltDocToUiBlock} from "@/utilities/TransformationUtilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {BlockUpdateRequest} from "@/domain/ui-block/BlockUpdateRequest";


export interface SpecStoreState {
    input: string,
    output: string,
    joltOperationList: JoltOperation[]
    uiBlockOperationList: UIBlockOperation[]
}


export const useSpecStore = defineStore('Spec Store', {
    state(): SpecStoreState {
        return {
            input: "",
            output: "",
            joltOperationList: [],
            uiBlockOperationList: [],
        }
    },
    getters: {
        nextIndex: (state: SpecStoreState) => state.uiBlockOperationList.length,
    },
    actions: {
        setJoltSpec(spec: JoltOperation[]) {
            this.joltOperationList = spec
        },
        updateBlocksFromJoltSpec() {
            this.uiBlockOperationList = convertSpecListToBlocks(this.joltOperationList)
        },
        updateJoltSpecFromBlocks() {
            this.joltOperationList = convertBlockToSpecList(this.uiBlockOperationList)
        },
        updateBlock(payload: BlockUpdateRequest) {
            // ! NOTE
            // * the use of index here may cause an issue with list rendering when
            // * we start doing things like reordering the list. we're using a UUID
            // * for the rendering key now, so it may be a good idea to switch this
            // * from an indexed splice to a lookup of the index based on uuid and
            // * then splicing
            this.uiBlockOperationList.splice(payload.index, 1, payload.operation)
        },
        addBlock(payload: BlockUpdateRequest) {
            const {index, operation} = payload
            const block = joltDocToUiBlock(operation)
            const targetIndex = index ? index : this.uiBlockOperationList.length
            this.uiBlockOperationList.splice(targetIndex, 0, block)
        },
        disableBlock(block: UIBlockOperation) {
            const targetBlock = this.uiBlockOperationList.find(b => b.id === block.id);
            if (targetBlock) {
                (targetBlock.renderData as AllBlocksGetThisRenderData).disabled = !(targetBlock.renderData as AllBlocksGetThisRenderData).disabled
            }
        },
        deleteBlock(block: UIBlockOperation) {
            const index = this.uiBlockOperationList.indexOf(block)
            this.uiBlockOperationList.splice(index, 1)
        }
    },
})


