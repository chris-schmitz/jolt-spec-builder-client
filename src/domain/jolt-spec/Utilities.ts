import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import ShiftTransformer from "@/store/shape-transformations/ShiftTransformer";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import RemoveTransformer from "@/store/shape-transformations/RemoveTransformer";
import DefaultTransformer from "@/store/shape-transformations/DefaultTransformer";

export function joltSpecDocToUiBlock(specDocument: JoltOperation): UIBlockOperation {
    switch (specDocument.renderComponent) {
        case UiBlockTypes.REMOVE:
            return RemoveTransformer.toUiBlock(specDocument)
        case UiBlockTypes.DEFAULT:
            return DefaultTransformer.toUiBlock(specDocument)
        case UiBlockTypes.SHIFT:
        case UiBlockTypes.PARSED_INGREDIENTS:
            return ShiftTransformer.toUiBlock(specDocument)
        default:
            return new UIBlockOperation(specDocument.operation, UiBlockTypes.RAW, specDocument.spec, {})
    }
}