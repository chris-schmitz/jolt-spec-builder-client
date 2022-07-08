import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {SmartLabelNutritionRenderData, SmartLabelNutritionUiBlock} from "@/domain/operations/smartlabel-nutrition/SmartLabelNutritionUiBlock";


export function toUiBlock(operation: JoltOperation): SmartLabelNutritionUiBlock {
    const renderData: SmartLabelNutritionRenderData = {
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
    return new SmartLabelNutritionUiBlock(spec, renderData)
}

export function toJoltOperation(block: SmartLabelNutritionUiBlock) {
    const operation = new JoltOperation(block.operation, block.renderComponent, block.spec)
    if ((block.renderData as SmartLabelNutritionRenderData).passAlong) {
        // @ts-ignore
        operation.spec['@'] = ''
    }
    return operation
}
