import {UiBlockTypes} from "@/domain/ui-block/UiBlockUtilities";

export class JoltOperation {
    operation: string
    renderComponent?: UiBlockTypes
    spec: object

    constructor(operation: string, renderComponent: UiBlockTypes, spec: object) {
        this.operation = operation;
        this.renderComponent = renderComponent;
        this.spec = spec;
    }
}