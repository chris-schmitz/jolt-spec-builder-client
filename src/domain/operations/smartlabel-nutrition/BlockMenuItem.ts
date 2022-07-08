import smartLabelNutritionTemplate from "@/domain/operations/smartlabel-nutrition/DefaultJoltDoc";
import {toUiBlock} from "@/domain/operations/smartlabel-nutrition/Transformer";

export default {
    label: 'SmartLabel Nutrition',
    template: toUiBlock(smartLabelNutritionTemplate)
}