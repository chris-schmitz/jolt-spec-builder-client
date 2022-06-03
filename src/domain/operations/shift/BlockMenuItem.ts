import shiftTemplate from "@/domain/operations/shift/DefaultJoltDoc";
import {toUiBlock} from "@/domain/operations/shift/Transformer";

export default {
    label: 'Shift',
    template: toUiBlock(shiftTemplate)
}