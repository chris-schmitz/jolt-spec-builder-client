import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";

export interface BlockUpdateRequest {
    index: number
    operation: UIBlockOperation
}