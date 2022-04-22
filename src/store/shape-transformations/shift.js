import {RenderComponentTypes} from "@/store/SpecStore";


export function formatForShiftComponent(operation) {
  operation.renderComponent = RenderComponentTypes.SHIFT
  if ("@" in operation.spec || "@1" in operation.spec) {
    operation.renderData.passAlong = true
    delete operation.spec["@"]
    delete operation.spec["@1"]
  } else {
    operation.renderData.passAlong = false
  }
  return operation;
}

export function formatForShiftJoltOperation(block) {
  if (block.renderData.passAlong) {
    block.spec["@"] = ""
  }
  return block;
}