import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {toJoltOperation as toShiftJoltOperation, toUiBlock as toShiftUiBlock} from "@/utilities/operations/shift/ShiftTransformer";
import {toJoltOperation as toRawJoltOperation, toUiBlock as toRawUiBlock} from "@/utilities/operations/raw/RawTransformer";
import {toJoltOperation as toRemoveJoltOperation, toUiBlock as toRemoveUiBlock} from "@/utilities/operations/remove/RemoveTransformer";
import {toJoltOperation as toDefaultJoltOperation, toUiBlock as toDefaultUiBlock} from "@/utilities/operations/default/DefaultTransformer";

export function joltSpecDocToUiBlock(specDocument: JoltOperation): UIBlockOperation {
    switch (specDocument.renderComponent || specDocument.operation) {
        case UiBlockTypes.REMOVE:
            return toRemoveUiBlock(specDocument)
        case UiBlockTypes.DEFAULT:
            return toDefaultUiBlock(specDocument)
        case UiBlockTypes.SHIFT:
        case UiBlockTypes.PARSED_INGREDIENTS:
            return toShiftUiBlock(specDocument)
        default:
            return toRawUiBlock(specDocument)
    }
}


export function uiBlockToJoltSpecDoc(block: UIBlockOperation) {
    switch (block.renderComponent) {
        case 'shift':
            return toShiftJoltOperation(block)
        case 'remove':
            return toRemoveJoltOperation(block)
        case 'default':
            return toDefaultJoltOperation(block)
        case 'sort':
        case 'cardinality':
        default:
            return toRawJoltOperation(block)
    }
}

export function convertBlockToSpecList(blocksProxies: UIBlockOperation[]) {
    return JSON
        .parse(JSON.stringify(blocksProxies)) // ! note we need this step to convert the vue proxies back to regular js objects
        .map(uiBlockToJoltSpecDoc)
}

export function convertSpecListToBlocks(spec: JoltOperation[]): UIBlockOperation[] {
    // ? why does this not clear out the blocks for an empty list
    return spec.map(operation => joltSpecDocToUiBlock(operation))
}