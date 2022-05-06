import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {BlockRenderData} from "@/domain/ui-block/UiBlockUtilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {v4 as uuidv4} from 'uuid';

export class UIBlockOperation implements JoltOperation {
    renderData: BlockRenderData = {}
    operation = ""
    renderComponent: UiBlockTypes;
    spec: object;
    id: string

    constructor(operation: string, renderComponent: UiBlockTypes, spec: object, renderData: BlockRenderData) {
        this.operation = operation
        this.renderComponent = renderComponent
        this.spec = spec
        this.renderData = renderData
        this.id = uuidv4()
    }

}