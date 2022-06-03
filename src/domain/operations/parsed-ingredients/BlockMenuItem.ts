import parsedIngredientTemplate from "@/domain/operations/parsed-ingredients/DefaultJoltDoc";
import {toUiBlock} from "@/domain/operations/parsed-ingredients/Transformer";

export default {
    label: 'Parsed Ingredients',
    template: toUiBlock(parsedIngredientTemplate)
}