// TODO: consider moving
// ? does it make sense to leave this logic in here, or would this be better
// ? placed in a utility file?
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import ShiftOperation from "@/components/ui-blocks/ShiftOperation.vue";
import DefaultOperation from "@/components/ui-blocks/DefaultOperation.vue";
import RemoveOperation from "@/components/ui-blocks/RemoveOperation.vue";
import RawJolt from "@/components/ui-blocks/RawJolt.vue";
import ShiftTransformer from "@/store/shape-transformations/ShiftTransformer";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {RawTransformer} from "@/store/shape-transformations/RawTransformer";
import DefaultTransformer from "@/store/shape-transformations/DefaultTransformer";
import RemoveTransformer from "@/store/shape-transformations/RemoveTransformer";

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
        case UiBlockTypes.DEFAULT:
            return DefaultOperation
        case UiBlockTypes.REMOVE:
            return RemoveOperation
        default:
            return RawJolt
    }
}

// TODO: refactor consideration
// * there are two considerations here:
// - the switch statement for the two conversion functions are really similar and could be 99 bottled
// - the awareness of what transformers are available and associated with which type of render component could be put behind a factory
// * the first consideration is pretty straight forward, but the second is a bit more obscure. Basically, if we wanted to make the transformations
// * plugin-able it would be good to abstract these conversion concepts so we could dynamically inject the transformation tools at runtime
export function convertBlockToSpecList(blocksProxies: UIBlockOperation[]) {
    const blocks = JSON.parse(JSON.stringify(blocksProxies))
    const spec = blocks
        .map((block: UIBlockOperation) => {
            switch (block.renderComponent) {
                case 'shift':
                    return ShiftTransformer.toJoltOperation(block)
                case 'remove':
                    return RemoveTransformer.toJoltOperation(block)
                case 'default':
                    return DefaultTransformer.toJoltOperation(block)
                case 'sort':
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
                    return DefaultTransformer.toUiBlock(object)
                case 'sort':
                case 'remove':
                case 'cardinality':
                    return RawTransformer.toUiBlock(object)
                default:
                    return RawTransformer.toUiBlock(object)
            }
        })
}

