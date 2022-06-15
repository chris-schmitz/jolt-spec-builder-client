import {BlockRenderData, UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";


export class DefaultUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: BlockRenderData) {
        super("default", UiBlockTypes.DEFAULT, spec, renderData);
    }
}