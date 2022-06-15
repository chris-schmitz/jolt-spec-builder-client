import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {RemoveUiBlock} from "@/domain/operations/remove/RemoveUiBlock";

export function toUiBlock(operation: JoltOperation) {
    return new RemoveUiBlock(operation.spec, {})
}

export function toJoltOperation(block: UIBlockOperation) {
    return new JoltOperation(block.operation, block.renderComponent, block.spec)
}


