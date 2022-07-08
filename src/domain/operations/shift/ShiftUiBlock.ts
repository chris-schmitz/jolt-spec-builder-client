import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockUtilities";

export interface ShiftBlockRenderData {
    passAlong: boolean
}

export class ShiftUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: ShiftBlockRenderData) {
        super("shift", UiBlockTypes.SHIFT, spec, renderData);
    }
}