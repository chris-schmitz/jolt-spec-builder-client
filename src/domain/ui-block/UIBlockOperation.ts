import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {BlockRenderData} from "@/domain/ui-block/UiBlockUtilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";

export class UIBlockOperation implements JoltOperation {
    renderData: BlockRenderData = {}
    operation = ""
    renderComponent: UiBlockTypes;
    spec: object;

    constructor(operation: string, renderComponent: UiBlockTypes, spec: object, renderData: BlockRenderData) {
        this.operation = operation
        this.renderComponent = renderComponent
        this.spec = spec
        this.renderData = renderData
    }

}