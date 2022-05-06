import {UiBlockTypes} from "@/domain/ui-block/UiBlockTypes";
import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import ShiftTransformer from "@/store/shape-transformations/ShiftTransformer";
import DefaultTransformer from "@/store/shape-transformations/DefaultTransformer";
import {RawTransformer} from "@/store/shape-transformations/RawTransformer";

// TODO: consider location
// ? does this really belong in with the stores, or is this more of a utility class? does it belong in the domain directory??
export default class RemoveTransformer {
    static toUiBlock(operation: JoltOperation) {
        return new UIBlockOperation(
            operation.operation,
            UiBlockTypes.REMOVE,
            operation.spec,
            {}
        )

    }

    // TODO: refactor consideration
    // * man this sure is shaping up to be a method that could be a default on a base class that can be overriden
    // * by subclasses that need more specialized toJoltOperation methods (e.g. Shift's version)
    // ! also, consider the structure Josh suggested in 1 on 1
    // ^ the gist being: remember that in js everything is an object and classes are just syntax sugar, you can create
    // ^ an object that is a map for all of the different transformer methods of a specific type where the object key
    // ^ is the name of the transformer (or an enum with the transformer names), then later where you would normally use
    // ^ a switch to branch to the specific transformer, you can just call the map object and dynamically call the method
    // ^ using the appropriate name:
    // const toJoltOperation = {
    //     shift: ShiftTransformer.toJoltOperation,
    //     default: DefaultTransformer.toJoltOperation,
    //     remove: RemoveTransformer.toJoltOperation,
    //     raw: RawTransformer.toJoltOperation.
    // }
    //
    // function convertToJoltOperation(transformationType, block) {
    //     return toJoltOperation[transformationType](block)
    // }
    static toJoltOperation(block: UIBlockOperation) {
        return new JoltOperation(block.operation, block.renderComponent, block.spec)
    }
}


