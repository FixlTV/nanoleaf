import axios from 'axios';
import { AbortController } from 'node-abort-controller'
import c from './const'
import HttpError from './errors/HttpError'

export default class HttpClient {
    ip: URL
    token: string

    constructor(ip: string, token: string) {
        this.token = token
        this.ip = new URL(`http://${ip}:${c.PORT}/api/v1/${this.token ? this.token + '/' : ''}`)
    }

    login(token: string): void {
        this.token = token
        this.ip = new URL(`http://${this.ip.hostname}:${c.PORT}/api/v1/${this.token ? this.token + '/' : ''}`)
    }

    async get(path: string = '') {
        const controller = new AbortController()
        setTimeout(() => controller.abort(), c.TIMEOUT)

        try {
            const res = await axios
                .get(
                    this.ip + path,
                    {
                        //@ts-ignore
                        signal: controller.signal,
                    });
            return {
                status: res.status,
                statusText: res.statusText,
                data: res.data
            };
        } catch (err: any) {
            throw this.handleError(err)
        }
    }

    async put(path: string = '', body: any = {}) {
        const controller = new AbortController()
        setTimeout(() => controller.abort(), c.TIMEOUT)

        try {
            const res = await axios
                .put(
                    this.ip + path,
                    body,
                    {
                        //@ts-ignore
                        signal: controller.signal,
                    });
            return {
                status: res.status,
                statusText: res.statusText,
                data: res.data
            };
        } catch (err: any) {
            throw this.handleError(err)
        }
    }

    async post(path: string = '', body: any = {}) {
        const controller = new AbortController()
        setTimeout(() => controller.abort(), c.TIMEOUT)

        try {
            const res = await axios
                .post(
                    this.ip + path,
                    body,
                    {
                        //@ts-ignore
                        signal: controller.signal,
                    });
            return {
                status: res.status,
                statusText: res.statusText,
                data: res.data
            };
        } catch (err: any) {
            throw this.handleError(err)
        }
    }

    handleError(error: any) {
        let message, statusCode = error.response.statusCode ? error.response.statusCode : 0

        message =
            statusCode == 400 ? 'Bad Request' :
            statusCode == 401 ? 'Unauthorized' :
            statusCode == 403 ? 'Forbidden' :
            statusCode == 404 ? 'Not Found' :
            statusCode == 422 ? 'Unprocessable Entity' :
            statusCode == 500 ? 'Internal Server Error' :
            'Device offline'

        return new HttpError(message, statusCode)
    }
}