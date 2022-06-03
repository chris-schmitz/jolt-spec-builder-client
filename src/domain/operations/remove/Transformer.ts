import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

export function toUiBlock(operation: JoltOperation) {
    return new UIBlockOperation(
        operation.operation,
        UiBlockTypes.REMOVE,
        operation.spec,
        {}
    )

}

export function toJoltOperation(block: UIBlockOperation) {
    return new JoltOperation(block.operation, block.renderComponent, block.spec)
}


