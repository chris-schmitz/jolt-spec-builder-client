import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";

export interface ParsedIngredientsRenderData {
    passAlong: boolean
}

export class ParsedIngredientsUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: ParsedIngredientsRenderData) {
        super("shift", UiBlockTypes.PARSED_INGREDIENTS, spec, renderData);
    }
}