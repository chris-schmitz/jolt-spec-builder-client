import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {CardinalityType} from "@/domain/operations/single-cardinality/Transformer";

export interface SingleCardinalityRenderData {
    targetKeyPath: string,
    cardinalityType: CardinalityType
}

export class SingleCardinalityUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: SingleCardinalityRenderData) {
        super("cardinality", UiBlockTypes.SINGLE_CARDINALITY, spec, renderData)
    }
}