import {JoltOperation} from "@/domain/jolt-spec/JoltOperation"
import jsonPath from "jsonpath"
import {RekeyPropertyRenderData, RekeyPropertyUiBlock} from "@/domain/operations/rekey-property/RekeyPropertyUiBlock";
import {ShiftBlockRenderData} from "@/domain/operations/shift/ShiftUiBlock";


export function toUiBlock(operation: JoltOperation): RekeyPropertyUiBlock {
    let passAlong = false

    const spec = JSON.parse(JSON.stringify(operation.spec))
    if ('@' in spec || '@1' in spec) {
        passAlong = true
        // @ts-ignore
        delete spec['@']
        // @ts-ignore
        delete spec['@1']
    } else {
        passAlong = false
    }

    const targetKeyPath = objectToDotNotation(spec) || ""
    let newKey
    if (targetKeyPath) {
        newKey = jsonPath.query(spec, targetKeyPath).pop()
    }


    return new RekeyPropertyUiBlock(
        spec,
        {targetKeyPath, newKey, passAlong})
}

export function toJoltOperation(block: RekeyPropertyUiBlock) {
    const spec = dotNotationToObject(
        (block.renderData as RekeyPropertyRenderData).targetKeyPath,
        (block.renderData as RekeyPropertyRenderData).newKey
    )
    if ((block.renderData as ShiftBlockRenderData).passAlong) {
        // @ts-ignore
        spec['@'] = ''
    }
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
