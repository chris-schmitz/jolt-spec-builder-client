import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";

export function toJoltOperation(block: UIBlockOperation) {
    return new JoltOperation(block.operation, block.renderComponent, block.spec)
}


export function toUiBlock(operation: JoltOperation) {
    return new UIBlockOperation(operation.operation, UiBlockTypes.RAW, operation.spec, {})
}

