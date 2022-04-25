import { JoltOperation, RenderComponentTypes } from '@/store/SpecStore'

export function formatForRawComponent(operation: JoltOperation) {
  operation.renderComponent = RenderComponentTypes.RAW
  return operation
}
