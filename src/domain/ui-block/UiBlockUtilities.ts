// TODO: consider moving
// ? does it make sense to leave this logic in here, or would this be better
// ? placed in a utility file?
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import ShiftOperation from "@/components/ui-blocks/ShiftOperation.vue";
import DefaultOperation from "@/components/ui-blocks/DefaultOperation.vue";
import RemoveOperation from "@/components/ui-blocks/RemoveOperation.vue";
import RawJolt from "@/components/ui-blocks/RawJolt.vue";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

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


