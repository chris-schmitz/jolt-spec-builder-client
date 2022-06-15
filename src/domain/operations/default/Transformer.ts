import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {DefaultUiBlock} from "@/domain/operations/default/DefaultUiBlock";

// TODO: consider location
// ? does this really belong in with the stores, or is this more of a utility class? does it belong in the domain directory??
export function toUiBlock(operation: JoltOperation): DefaultUiBlock {
    return new DefaultUiBlock(operation.spec, {})
}

export function toJoltOperation(block: DefaultUiBlock) {
    return new JoltOperation(block.operation, block.renderComponent, block.spec)
}

