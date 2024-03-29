import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {ShiftBlockRenderData, ShiftUiBlock} from "@/domain/operations/shift/ShiftUiBlock";


export function toUiBlock(operation: JoltOperation): ShiftUiBlock {
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
    return new ShiftUiBlock(spec, renderData)
}

export function toJoltOperation(block: ShiftUiBlock) {
    const operation = new JoltOperation(block.operation, block.renderComponent, block.spec)
    if ((block.renderData as ShiftBlockRenderData).passAlong) {
        // @ts-ignore
        operation.spec['@'] = ''
    }
    return operation
}
