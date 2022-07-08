import {AllBlocksGetThisRenderData, UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {UiBlockTypes} from "@/domain/ui-block/UiBlockUtilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {toJoltOperation as toShiftJoltOperation, toUiBlock as toShiftUiBlock} from "@/domain/operations/shift/Transformer";
import {toJoltOperation as toRawJoltOperation, toUiBlock as toRawUiBlock} from "@/domain/operations/raw/Transformer";
import {toJoltOperation as toRemoveJoltOperation, toUiBlock as toRemoveUiBlock} from "@/domain/operations/remove/Transformer";
import {toJoltOperation as toDefaultJoltOperation, toUiBlock as toDefaultUiBlock} from "@/domain/operations/default/Transformer";
import {toJoltOperation as toSingleCardinalityJoltOperation, toUiBlock as toSingleCardinalityUiBlock} from "@/domain/operations/single-cardinality/Transformer";
import {
    toJoltOperation as toSmartLabelNutritionJoltOperation,
    toUiBlock as toSmartLabelNutritionUiBlock
} from "@/domain/li-operations/smartlabel-nutrition/Transformer"
import {toJoltOperation as toRekeyJoltOperation, toUiBlock as toRekeyPropertyUiBlock} from "@/domain/operations/rekey-property/Transformer"


export function joltDocToUiBlock(specDocument: JoltOperation): UIBlockOperation {
    switch (specDocument.renderComponent || specDocument.operation) {
        case UiBlockTypes.REMOVE:
            return toRemoveUiBlock(specDocument)
        case UiBlockTypes.DEFAULT:
            return toDefaultUiBlock(specDocument)
        case UiBlockTypes.SINGLE_CARDINALITY:
            return toSingleCardinalityUiBlock(specDocument)
        case UiBlockTypes.SMARTLABEL_NUTRITION:
            return toSmartLabelNutritionUiBlock(specDocument)
        case UiBlockTypes.SHIFT:
            return toShiftUiBlock(specDocument)
        case UiBlockTypes.REKEY_PROPERTY:
            return toRekeyPropertyUiBlock(specDocument)
        default:
            return toRawUiBlock(specDocument)
    }
}

export function uiBlockToJoltDoc(block: UIBlockOperation) {
    switch (block.renderComponent) {
        case UiBlockTypes.SHIFT:
            return toShiftJoltOperation(block)
        case UiBlockTypes.REMOVE:
            return toRemoveJoltOperation(block)
        case UiBlockTypes.SINGLE_CARDINALITY:
            return toSingleCardinalityJoltOperation(block)
        case UiBlockTypes.DEFAULT:
            return toDefaultJoltOperation(block)
        case UiBlockTypes.SMARTLABEL_NUTRITION:
            return toSmartLabelNutritionJoltOperation(block)
        case UiBlockTypes.REKEY_PROPERTY:
            return toRekeyJoltOperation(block)
        // case 'sort':
        // case 'cardinality':
        default:
            return toRawJoltOperation(block)
    }
}

export function convertBlockToSpecList(blocksProxies: UIBlockOperation[]): JoltOperation[] {
    return JSON
        .parse(JSON.stringify(blocksProxies)) // ! note we need this step to convert the vue proxies back to regular js objects
        .filter((block: UIBlockOperation) => !(block.renderData as AllBlocksGetThisRenderData).disabled)
        .map(uiBlockToJoltDoc)
}

export function convertSpecListToBlocks(spec: JoltOperation[]): UIBlockOperation[] {
    // ? why does this not clear out the blocks for an empty list
    return spec.map(operation => joltDocToUiBlock(operation))
}