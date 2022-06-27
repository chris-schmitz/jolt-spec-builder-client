import {JoltOperation} from "@/domain/jolt-spec/JoltOperation";
import {SpecStoreState, useSpecStore} from "@/store/SpecStore";
import {Store} from "pinia";
import JSON5 from "json5";

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
        return new TransformationRequest(input, JSON5.parse(JSON5.stringify(specList)))
    }

    toString() {
        const spec = JSON5.stringify(this.specList)
        const input = this.input
        return JSON5.stringify({input, spec})
    }
}

export default class SpecSubmitter {
    private store: SpecStoreState
    private joltDocArray: JoltOperation[] = []

    constructor() {
        this.store = useSpecStore()
    }

    public async runTransformation(specList: JoltOperation[] = []) {
        this.setJoltDocArray(specList)

        if (this.canSubmitTransformation()) {
            // TODO: consider
            // ? should we set the this.store here directly or just pass back output?
            this.store.output = await SpecSubmitter.submitSpecAndInput(TransformationRequest.make(this.store.input, this.getJoltDocArray()))
        }

    }

    private canSubmitTransformation() {
        if (!this.store.input) return false
        if (this.getJoltDocArray().length == 0) return false

        return true
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

    private setJoltDocArray(specList: JoltOperation[]) {
        this.joltDocArray = specList
    }

    private getJoltDocArray(): JoltOperation[] {
        if (this.joltDocArray.length > 0) {
            return this.joltDocArray
        }
        if (this.store.joltSpecList.length > 0) {
            return this.store.joltSpecList
        }
        return []
    }
}
