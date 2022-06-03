import {toUiBlock} from "@/domain/operations/single-cardinality/Transformer";
import {DefaultJoltDoc} from "@/domain/operations/single-cardinality/DefaultJoltDoc";

export default {
    label: 'Single Cardinality',
    template: toUiBlock(DefaultJoltDoc)
}