import {joltDocToUiBlock} from "@/utilities/TransformationUtilities";
import removeTemplate from "@/domain/operations/remove/DefaultJoltDoc";

export default {
    label: 'Remove',
    template: joltDocToUiBlock(removeTemplate)
}