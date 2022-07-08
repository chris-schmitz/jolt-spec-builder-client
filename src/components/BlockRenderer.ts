import {useSpecStore} from "@/store/SpecStore";
import {AllBlocksGetThisRenderData, UIBlockOperation} from "@/domain/ui-block/UIBlockOperation";
import {BlockUpdateRequest} from "@/domain/ui-block/BlockUpdateRequest";
import SpecSubmitter from "@/utilities/SpecSubmitter";

// TODO: should we keep this?
// ! I can't decide if I like or hate this. This seems to be the way we need to do it to fix the timing issue
// ! of pinia being registered and these tools trying to use the spec store. If the tools are added directly to
// ! the component the timing is fine, but if we pull them out here to a typescript file and add them to the root
// ! then the spec store is used (i.e. the useSpecStore() call) before pinia has been registered because the function
// ! fires when all of the typescript files are being walked over. Putting it in here allows the getBlockRenderer function
// ! to get recognized by the transpiler/runtime without firing which is why pinia is able to be registered before the
// ! call is made.
// ? this is great and all, but is it worth the backflip? does it make it more readable? testable? worth it?
export function getBlockRenderTools() {

    const store = useSpecStore();
    const specSubmitter = SpecSubmitter.getInstance()


    function updateBlocks() {
        if (store.joltOperationList.length > 0) {
            store.updateBlocksFromJoltSpec()
        }
    }

    const blockIsDisabled = (block: UIBlockOperation) => {
        return {
            'disabled-block':
            (block.renderData as AllBlocksGetThisRenderData).disabled
        }
    }

    async function toggleDisableForBlock(block: UIBlockOperation) {
        store.disableBlock(block)
        await specSubmitter.runTransformationOnUiBlockOperationList()
    }

    async function deleteBlock(block: UIBlockOperation) {
        store.deleteBlock(block)
        await specSubmitter.runTransformationOnUiBlockOperationList()
    }

    async function updateSingleBlock(event: BlockUpdateRequest) {
        console.log(event)
        store.updateBlock(event);
        await specSubmitter.runTransformationOnUiBlockOperationList()
    }

    return {updateBlocks, blockIsDisabled, toggleDisableForBlock, deleteBlock, updateSingleBlock}
}