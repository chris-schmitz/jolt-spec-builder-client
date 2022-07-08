import {UiBlockTypes} from "@/domain/ui-block/UiBlockUtilities";
import {CardinalityType} from "@/domain/operations/single-cardinality/Transformer";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";

export interface SingleCardinalityRenderData {
    targetKeyPath: string,
    cardinalityType: CardinalityType
}


export class SingleCardinalityUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: SingleCardinalityRenderData) {
        super("cardinality", UiBlockTypes.SINGLE_CARDINALITY, spec, renderData)
    }
}