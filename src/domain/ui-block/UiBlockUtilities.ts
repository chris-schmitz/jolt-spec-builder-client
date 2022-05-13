// TODO: consider moving
// ? does it make sense to leave this logic in here, or would this be better
// ? placed in a utility file?
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import ShiftOperation from "@/components/ui-blocks/ShiftOperation.vue";
import DefaultOperation from "@/components/ui-blocks/DefaultOperation.vue";
import RemoveOperation from "@/components/ui-blocks/RemoveOperation.vue";
import RawJolt from "@/components/ui-blocks/RawJolt.vue";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import SingleCardinalityOperation from "@/components/ui-blocks/SingleCardinalityOperation.vue"


export interface RawBlockRenderData {
    passAlong: boolean
}

// TODO: consider refactor
// * think about the object map idea that josh brought up. it may be a good way to remove the switch here and
// * determine the component to return dynamically
// TODO: consider move
// * really this is kind of the domain of the SpecRenderer component, consider moving it back in there
export function determineBlockComponent(block: JoltOperation) {
    switch (block.renderComponent) {
        case UiBlockTypes.SHIFT:
            return ShiftOperation
        case UiBlockTypes.DEFAULT:
            return DefaultOperation
        case UiBlockTypes.REMOVE:
            return RemoveOperation
        case UiBlockTypes.SINGLE_CARDINALITY:
            return SingleCardinalityOperation
        default:
            return RawJolt
    }
}


