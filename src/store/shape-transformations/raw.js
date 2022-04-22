import {RenderComponentTypes} from "@/store/SpecStore";

export function formatForRawComponent(operation) {
  operation.renderComponent = RenderComponentTypes.RAW
  return operation
}

