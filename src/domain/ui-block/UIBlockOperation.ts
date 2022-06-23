import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {RawBlockRenderData} from "@/domain/ui-block/UiBlockUtilities";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {v4 as uuidv4} from 'uuid';
import {SingleCardinalityRenderData} from "@/domain/operations/single-cardinality/SingleCardinalityUiBlock";
import {ShiftBlockRenderData} from "@/domain/operations/shift/ShiftUiBlock";

export interface AllBlocksGetThisRenderData {
    disabled: boolean
}

export type BlockRenderData =
    SingleCardinalityRenderData
    | ShiftBlockRenderData
    | RawBlockRenderData
    | AllBlocksGetThisRenderData
    | Record<string, any>

export class UIBlockOperation implements JoltOperation {
    renderData: BlockRenderData
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