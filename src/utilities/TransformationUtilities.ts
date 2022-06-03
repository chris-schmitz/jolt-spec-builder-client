import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {toJoltOperation as toShiftJoltOperation, toUiBlock as toShiftUiBlock} from "@/domain/operations/shift/Transformer";
import {toJoltOperation as toRawJoltOperation, toUiBlock as toRawUiBlock} from "@/domain/operations/raw/Transformer";
import {toJoltOperation as toRemoveJoltOperation, toUiBlock as toRemoveUiBlock} from "@/domain/operations/remove/Transformer";
import {toJoltOperation as toDefaultJoltOperation, toUiBlock as toDefaultUiBlock} from "@/domain/operations/default/Transformer";
import {toJoltOperation as toSingleCardinalityJoltOperation, toUiBlock as toSingleCardinalityUiBlock} from "@/domain/operations/single-cardinality/Transformer";


export function joltDocToUiBlock(specDocument: JoltOperation): UIBlockOperation {
    switch (specDocument.renderComponent || specDocument.operation) {
        case UiBlockTypes.REMOVE:
            return toRemoveUiBlock(specDocument)
        case UiBlockTypes.DEFAULT:
            return toDefaultUiBlock(specDocument)
        case UiBlockTypes.SINGLE_CARDINALITY:
            return toSingleCardinalityUiBlock(specDocument)
        case UiBlockTypes.SHIFT:
        case UiBlockTypes.PARSED_INGREDIENTS:
            return toShiftUiBlock(specDocument)
        default:
            return toRawUiBlock(specDocument)
    }
}


export function uiBlockToJoltDoc(block: UIBlockOperation) {
    switch (block.renderComponent) {
        case 'shift':
            return toShiftJoltOperation(block)
        case 'remove':
            return toRemoveJoltOperation(block)
        case UiBlockTypes.SINGLE_CARDINALITY:
            return toSingleCardinalityJoltOperation(block)
        case 'default':
            return toDefaultJoltOperation(block)
        case 'sort':
        case 'cardinality':
        default:
            return toRawJoltOperation(block)
    }
}

export function convertBlockToSpecList(blocksProxies: UIBlockOperation[]): JoltOperation[] {
    return JSON
        .parse(JSON.stringify(blocksProxies)) // ! note we need this step to convert the vue proxies back to regular js objects
        .map(uiBlockToJoltDoc)
}

export function convertSpecListToBlocks(spec: JoltOperation[]): UIBlockOperation[] {
    // ? why does this not clear out the blocks for an empty list
    return spec.map(operation => joltDocToUiBlock(operation))
}