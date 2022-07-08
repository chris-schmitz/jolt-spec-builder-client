import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {DefaultUiBlock} from "@/domain/operations/default/DefaultUiBlock";

export function toUiBlock(operation: JoltOperation): DefaultUiBlock {
    return new DefaultUiBlock(operation.spec, {})
}

export function toJoltOperation(block: DefaultUiBlock) {
    return new JoltOperation(block.operation, block.renderComponent, block.spec)
}

