import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

export class RawTransformer {

    static formatForRawComponent(operation: JoltOperation) {
        operation.renderComponent = UiBlockTypes.RAW
        return operation
    }
}

