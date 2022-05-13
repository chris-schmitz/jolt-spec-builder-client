import {UIBlockOperation} from "@/domain/ui-block/UIBlockOperation"
import {JoltOperation} from "@/domain/jolt-spec/JoltOperation"
import jsonPath from "jsonpath"
import {SingleCardinalityRenderData, SingleCardinalityUiBlock} from "@/domain/operations/single-cardinality/UiBlock";

export enum CardinalityType {
    ONE = "ONE",
    MANY = "MANY"
}

export function toSingleCardinalityUiBlock(targetKeyPath: string, cardinalityType: CardinalityType): SingleCardinalityUiBlock {
    return new SingleCardinalityUiBlock({}, {targetKeyPath, cardinalityType})
}


// ? does this really belong in with the stores, or is this more of a utility class? does it belong in the domain directory??
export function toUiBlock(operation: JoltOperation): SingleCardinalityUiBlock {
    const targetKeyPath = objectToDotNotation(operation.spec) || ""
    let cardinality = "ONE"
    if (targetKeyPath) {
        cardinality = jsonPath.query(operation.spec, targetKeyPath).pop()
    }

    const cardinalityType = <CardinalityType>cardinality
    return new SingleCardinalityUiBlock(
        operation.spec,
        {targetKeyPath, cardinalityType})
}

export function toJoltOperation(block: SingleCardinalityUiBlock) {
    const spec = dotNotationToObject(
        (block.renderData as SingleCardinalityRenderData).targetKeyPath,
        (block.renderData as SingleCardinalityRenderData).cardinalityType
    )
    const operation = new JoltOperation(block.operation, block.renderComponent, spec)
    return operation
}

function isObject(a: any) {
    return (!!a) && (a.constructor === Object);
}

function dotNotationToObject(path: string, value: any) {
    return path
        .split(".")
        .reverse()
        .reduce((carry, current) => {
            const x = {}
            // @ts-ignore
            x[current] = carry
            return x
        }, value)
}


// function dotNotationToObject(path: string, carry = {}) {
//     const split = path.split(".")
//     if (split.length > 1) {
//         carry[split.shift()] = {}
//         return dotNotationToObject(split.join("."), carry)
//     }
//     carry[split.shift()] = ""
//     return carry
// }

// |: minus one typescript :|
function objectToDotNotation(spec: object): string | undefined {
    const keys = Object.keys(spec)
    if (keys.length === 0) {
        return ""
    }

    const firstKey = Object.keys(spec).pop()
    // @ts-ignore
    if (isObject(spec[firstKey])) {
        // @ts-ignore
        return `${firstKey}.${objectToDotNotation(spec[firstKey])}`
    }

    return firstKey
}

function getTargetKeyPath(specDoc: object) {
    const dotNotation = objectToDotNotation(specDoc)
    return typeof dotNotation !== "undefined" ? dotNotation : ""
}
