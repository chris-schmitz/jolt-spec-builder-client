import {BlockRenderData, UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockUtilities";

export class RemoveUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: BlockRenderData) {
        super("remove", UiBlockTypes.REMOVE, spec, renderData);
    }
}