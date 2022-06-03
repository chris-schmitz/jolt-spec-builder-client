import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {SpecStoreState, useSpecStore} from "@/store/SpecStore";
import {Store} from "pinia";

console.log("spec submitter ")

// const store = useSpecStore()

export class TransformationRequest {
    private input: string
    private specList: JoltOperation[]
    private store: Store<"Spec Store">;

    private constructor(input: string, specList: JoltOperation[]) {
        this.input = input;
        this.specList = specList;
        this.store = useSpecStore()
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

export default class SpecSubmitter {
    private store: SpecStoreState

    constructor() {
        this.store = useSpecStore()
    }

    public async runTransformation(specList: JoltOperation[] = []) {
        if (!this.store.input) return
        if (specList.length === 0 && this.store.joltSpecList.length === 0) return

        const list = specList.length > 0 ? specList : this.store.joltSpecList

        // TODO: consider
        // ? should we set the this.store here directly or just pass back output?
        this.store.output = await SpecSubmitter.submitSpecAndInput(TransformationRequest.make(this.store.input, list))
    }

    private static async submitSpecAndInput(request: TransformationRequest) {
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
}
