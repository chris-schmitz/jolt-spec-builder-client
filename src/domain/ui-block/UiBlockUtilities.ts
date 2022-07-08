import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import ShiftOperation from "@/domain/operations/shift/ShiftOperation.vue";
import DefaultOperation from "@/domain/operations/default/DefaultOperation.vue";
import RemoveOperation from "@/domain/operations/remove/RemoveOperation.vue";
import RawJolt from "@/domain/operations/raw/RawJolt.vue";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import SingleCardinalityOperation from "@/domain/operations/single-cardinality/SingleCardinalityOperation.vue"
import {uiComponent} from "@/domain/operations/smartlabel-nutrition/SmartLabelNutritionUiBlock";


export interface RawBlockRenderData {
    passAlong: boolean
}

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
        case UiBlockTypes.SMARTLABEL_NUTRITION:
            return uiComponent
        default:
            return RawJolt
    }
}


