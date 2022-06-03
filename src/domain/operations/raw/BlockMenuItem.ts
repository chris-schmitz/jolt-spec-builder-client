import rawTemplate from "@/domain/operations/raw/DefaultJoltDoc";
import {toUiBlock} from "@/domain/operations/raw/Transformer";

export default {
    label: 'Raw Jolt',
    template: toUiBlock(rawTemplate),
}