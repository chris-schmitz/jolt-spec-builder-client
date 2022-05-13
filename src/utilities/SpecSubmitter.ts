import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {useSpecStore} from "@/store/SpecStore";

const store = useSpecStore()

export class TransformationRequest {
    private input: string
    private specList: JoltOperation[]

    private constructor(input: string, specList: JoltOperation[]) {
        this.input = input;
        this.specList = specList;
    }

    static make(input: string, specList: JoltOperation[]) {
        return new TransformationRequest(input, JSON.parse(JSON.stringify(specList)))
    }

    toString() {
        const spec = JSON.stringify(this.specList)
        const input = this.input
        return JSON.stringify({input, spec})
    }
}

export async function runTransformation(specList: JoltOperation[] = []) {
    if (!store.input) return
    if (specList.length === 0 && store.joltSpecList.length === 0) return

    const list = specList.length > 0 ? specList : store.joltSpecList

    // TODO: consider
    // ? should we set the store here directly or just pass back output?
    store.output = await submitSpecAndInput(TransformationRequest.make(store.input, list))
}

export async function submitSpecAndInput(request: TransformationRequest) {
    const response = await fetch('http://localhost:8080/transform', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: request.toString()
    });
    return await response.json();
}
