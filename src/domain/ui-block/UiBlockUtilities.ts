// TODO: consider moving
// ? does it make sense to leave this logic in here, or would this be better
// ? placed in a utility file?
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import ShiftOperation from "@/components/ui-blocks/ShiftOperation.vue";
import RawJolt from "@/components/ui-blocks/RawJolt.vue";
import ShiftTransformer from "@/store/shape-transformations/ShiftTransformer";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {RawTransformer} from "@/store/shape-transformations/RawTransformer";

export type BlockRenderData = ShiftBlockRenderData | RawBlockRenderData | Record<string, unknown>

interface ShiftBlockRenderData {
    passAlong: boolean

}

interface RawBlockRenderData {
    passAlong: boolean
}

export interface BlockUpdateRequest {
    index: number
    operation: UIBlockOperation
}

export function determineBlockComponent(block: JoltOperation) {
    switch (block.renderComponent) {
        case UiBlockTypes.SHIFT:
            return ShiftOperation
        default:
            return RawJolt
    }
}

export function convertBlockToSpecList(blocksProxies: UIBlockOperation[]) {
    const blocks = JSON.parse(JSON.stringify(blocksProxies))
    const spec = blocks
        .map((block: UIBlockOperation) => {
            switch (block.renderComponent) {
                case 'shift':
                    return ShiftTransformer.toJoltOperation(block)
                case 'default':
                case 'sort':
                case 'remove':
                case 'cardinality':
                    return block
                default:
                    return block
            }
        })
    return spec
}


export function convertSpecListToBlocks(spec: JoltOperation[]): UIBlockOperation[] {
    return spec
        .map((object: JoltOperation) => {
            switch (object.renderComponent || object.operation) {
                case 'shift':
                    return ShiftTransformer.toUiBlock(object)
                case 'default':
                case 'sort':
                case 'remove':
                case 'cardinality':
                    return RawTransformer.toUiBlock(object)
                default:
                    return RawTransformer.toUiBlock(object)
            }
        })
}

