import { toJoltOperation, toUiBlock } from '@/domain/operations/shift/Transformer'

describe('Shift Transformation', () => {
  it('converts a jolt document to a UI block', () => {
    const document = {
      operation: 'shift',
      spec: {
        test: 'worked',
      },
    }
    const block = {
      operation: 'shift',
      renderComponent: 'shift',
      renderData: {
        passAlong: false,
      },
      spec: {
        test: 'worked',
      },
    }

    const actual = toUiBlock(document)

    expect(actual).toMatchObject(block)
  })
  it('converts a UI block jolt document', () => {
    const document = {
      operation: 'shift',
      renderComponent: 'shift',
      spec: {
        test: 'worked',
      },
    }
    const block = {
      operation: 'shift',
      renderComponent: 'shift',
      renderData: {
        id: 123,
        passAlong: false,
      },
      spec: {
        test: 'worked',
      },
    }

    const actual = toJoltOperation(block)

    expect(actual).toMatchObject(document)
  })
})
