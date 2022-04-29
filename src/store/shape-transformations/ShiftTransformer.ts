import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

// TODO: consider location
// ? does this really belong in with the stores, or is this more of a utility class? does it belong in the domain directory??
export default class ShiftTransformer {
    static toUiBlock(operation: JoltOperation) {
        const block = new UIBlockOperation(
            operation.operation,
            UiBlockTypes.SHIFT,
            operation.spec,
            {passAlong: false}
        )

        if ('@' in operation.spec || '@1' in operation.spec) {
            block.renderData.passAlong = true
            // @ts-ignore
            delete block.spec['@']
            // @ts-ignore
            delete block.spec['@1']
        } else {
            block.renderData.passAlong = false
        }
        return block
    }

    static toJoltOperation(block: UIBlockOperation) {
        const operation = new JoltOperation(block.operation, block.renderComponent, block.spec)
        if (block.renderData.passAlong) {
            // @ts-ignore
            operation.spec['@'] = ''
        }
        return operation
    }
}

