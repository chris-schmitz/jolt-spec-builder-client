import JSON5 from "json5";

export default function isValidJson(value: string): boolean {
    try {
        JSON5.parse(value)
        return true
    } catch (error) {
        return false
    }
}
