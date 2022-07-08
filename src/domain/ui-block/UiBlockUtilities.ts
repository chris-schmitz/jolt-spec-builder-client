import ShiftOperation from "@/domain/operations/shift/ShiftOperation.vue";
import DefaultOperation from "@/domain/operations/default/DefaultOperation.vue";
import RemoveOperation from "@/domain/operations/remove/RemoveOperation.vue";
import RawJolt from "@/domain/operations/raw/RawJolt.vue";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import SingleCardinalityOperation from "@/domain/operations/single-cardinality/SingleCardinalityOperation.vue"
import {uiComponent} from "@/domain/li-operations/smartlabel-nutrition/SmartLabelNutritionUiBlock";
import RekeyPropertyUiBlock from "@/domain/operations/rekey-property/RekeyProperty.vue";

export enum UiBlockTypes {
    RAW = 'raw',
    SHIFT = 'shift',
    DEFAULT = 'default',
    SORT = 'sort',
    REMOVE = 'remove',
    CARDINALITY = 'cardinality',
    RENAME = "rename",
    UNNEST = "unnest",
    NEST = "nest",
    SMARTLABEL_NUTRITION = "smartlabel_nutrition",
    SINGLE_CARDINALITY = "single_cardinality",
    CORE_PRODUCT = "core_product",
    REKEY_PROPERTY = "rekey_property",
}

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
        case UiBlockTypes.REKEY_PROPERTY:
            return RekeyPropertyUiBlock
        default:
            return RawJolt
    }
}


