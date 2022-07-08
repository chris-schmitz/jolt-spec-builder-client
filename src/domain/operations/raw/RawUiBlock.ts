import {BlockRenderData, UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";

export class RawUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: BlockRenderData) {
        super("UNKNOWN", UiBlockTypes.RAW, spec, renderData);
    }
}