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

//     // ! the above feels more verbose than it needs to be, but I'm going this way because:
//     // - render component is optional on JoltOperation
//     // - the object map version of this pattern could possibly return undefined (e.g. transformToUiBlock[specDocument.renderComponent] == undefined)
//     // * It is still less code than a switch statement and it makes the transformer objects a bit cleaner, but it requires an intermediate module
//     // * and the code here isn't particularly readable. Really, it's kind of abstract to the point where if you don't know the pattern looking through
//     // * is kind of confusing.
// export function joltSpecDocToUiBlock(specDocument: JoltOperation): UIBlockOperation {
//
//     if (specDocument.renderComponent) {
//         const transformer = transformToUiBlock[specDocument.renderComponent]
//         if (transformer) {
//             return transformer(specDocument)
//         }
//     }
//     return new UIBlockOperation(specDocument.operation, UiBlockTypes.RAW, specDocument.spec, {})
// }