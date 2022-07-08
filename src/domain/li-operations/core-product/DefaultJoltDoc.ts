import {UiBlockTypes} from "@/domain/ui-block/UiBlockUtilities";

export default {
    operation: 'shift',
    renderComponent: UiBlockTypes.CORE_PRODUCT,
    spec: {
        "@": "",
        "prepareProduct": {
            "stuff-that-makes-up-core-product": "to-standard-shape"
        }
    },
}