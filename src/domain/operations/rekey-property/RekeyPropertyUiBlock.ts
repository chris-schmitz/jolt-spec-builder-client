import {UiBlockTypes} from "@/domain/ui-block/UiBlockUtilities";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";

export interface RekeyPropertyRenderData {
    targetKeyPath: string,
    newKey: string,
    passAlong: boolean
}


export class RekeyPropertyUiBlock extends UIBlockOperation {
    constructor(spec: object, renderData: RekeyPropertyRenderData) {
        super("shift", UiBlockTypes.REKEY_PROPERTY, spec, renderData)
    }
}