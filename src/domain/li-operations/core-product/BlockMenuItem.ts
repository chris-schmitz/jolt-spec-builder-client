import {joltDocToUiBlock} from "@/utilities/TransformationUtilities";
import coreProductTemplate from "@/domain/li-operations/core-product/DefaultJoltDoc";

export default {
    label: "Core Product",
    template: joltDocToUiBlock(coreProductTemplate)
}