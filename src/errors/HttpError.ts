export default class HttpError {
    status: number
    message: string

    constructor(message: string, status: number) {
        this.status = status
        this.message = message
    }
}