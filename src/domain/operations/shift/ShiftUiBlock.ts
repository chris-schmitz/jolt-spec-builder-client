import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";

export interface ShiftBlockRenderData {
    passAlong: boolean
}

export class ShiftUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: ShiftBlockRenderData) {
        super("shift", UiBlockTypes.SHIFT, spec, renderData);
    }
}