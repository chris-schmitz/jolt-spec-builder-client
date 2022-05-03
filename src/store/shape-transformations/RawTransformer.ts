import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";

export class RawTransformer {

    static toUiBlock(operation: JoltOperation) {
        return new UIBlockOperation(operation.operation, UiBlockTypes.RAW, operation.spec, {})
    }
}

