import smartLabelNutritionTemplate from "@/domain/li-operations/smartlabel-nutrition/DefaultJoltDoc";
import {toUiBlock} from "@/domain/li-operations/smartlabel-nutrition/Transformer";

export default {
    label: 'SmartLabel Nutrition',
    template: toUiBlock(smartLabelNutritionTemplate)
}