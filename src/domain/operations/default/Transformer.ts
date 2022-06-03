import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

// TODO: consider location
// ? does this really belong in with the stores, or is this more of a utility class? does it belong in the domain directory??
export function toUiBlock(operation: JoltOperation) {
    return new UIBlockOperation(
        operation.operation,
        UiBlockTypes.DEFAULT,
        operation.spec,
        {}
    )

}

export function toJoltOperation(block: UIBlockOperation) {
    return new JoltOperation(block.operation, block.renderComponent, block.spec)
}

