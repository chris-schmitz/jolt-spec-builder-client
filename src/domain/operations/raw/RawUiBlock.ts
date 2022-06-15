import {BlockRenderData, UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";

export class RawUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: BlockRenderData) {
        // TODO: how do we handle this? pass another argument?
        super("UNKNOWN", UiBlockTypes.RAW, spec, renderData);
    }
}