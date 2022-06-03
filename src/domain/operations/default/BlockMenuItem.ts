import defaultTemplate from "@/domain/operations/default/DefaultJoltDoc";
import {toUiBlock} from "@/domain/operations/default/Transformer";

export default {
    label: 'Default',
    template: toUiBlock(defaultTemplate)
}
