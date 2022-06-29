export default function isValidJson(value: string): boolean {
    try {
        JSON.parse(value)
        return true
    } catch (error) {
        return false
    }
}
