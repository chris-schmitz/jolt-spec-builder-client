import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import ShiftTransformer from "@/store/shape-transformations/ShiftTransformer";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

export function joltSpecDocToUiBlock(specDocument: JoltOperation): UIBlockOperation {
    switch (specDocument.renderComponent) {
        case UiBlockTypes.SHIFT:
        case UiBlockTypes.PARSED_INGREDIENTS:
            return ShiftTransformer.toUiBlock(specDocument)
        default:
            return new UIBlockOperation(specDocument.operation, UiBlockTypes.RAW, specDocument.spec, {})
    }
}