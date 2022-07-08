import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {ShiftBlockRenderData} from "@/domain/operations/shift/ShiftUiBlock";
import {ParsedIngredientsUiBlock} from "@/domain/operations/parsed-ingredients/ParsedIngredientsUiBlock";


export function toUiBlock(operation: JoltOperation): ParsedIngredientsUiBlock {
    const renderData: ShiftBlockRenderData = {
        passAlong: false
    }

    const spec = JSON.parse(JSON.stringify(operation.spec))
    if ('@' in operation.spec || '@1' in operation.spec) {
        renderData.passAlong = true
        // @ts-ignore
        delete spec['@']
        // @ts-ignore
        delete spec['@1']
    } else {
        renderData.passAlong = false
    }
    return new ParsedIngredientsUiBlock(spec, renderData)
}

export function toJoltOperation(block: ParsedIngredientsUiBlock) {
    const operation = new JoltOperation(block.operation, block.renderComponent, block.spec)
    if ((block.renderData as ShiftBlockRenderData).passAlong) {
        // @ts-ignore
        operation.spec['@'] = ''
    }
    return operation
}
