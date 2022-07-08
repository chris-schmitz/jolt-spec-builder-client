import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import SmartLabelNutrition from "./SmartLabel-Nutritition.vue"

export interface SmartLabelNutritionRenderData {
    passAlong: boolean
}

export class SmartLabelNutritionUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: SmartLabelNutritionRenderData) {
        super("shift", UiBlockTypes.SMARTLABEL_NUTRITION, spec, renderData);
    }
}

export const uiComponent = SmartLabelNutrition