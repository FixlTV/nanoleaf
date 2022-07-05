import HttpClient from './HttpClient'
import { Info, HttpResponse, LimitedValue } from './interfaces'

export default class Client {
    http: HttpClient

    constructor(ip: string, token: string) {
        this.http = new HttpClient(ip, token)
    }

    async login(token?: string) {
        if(!token) {
            let { data } = await this.http.post('new')
            token = data.auth_token
        }
        //@ts-ignore
        this.http.login(token)
    }

    async getPowerStatus(): Promise<boolean> {
        let { data } = await this.http.get('state/on')
        return data?.value
    }

    async getInfo(): Promise<Info> {
        let { data } = await this.http.get('')
        return data
    }

    async identify(): Promise<void> {
        await this.http.put('identify')
    }

    async power(power: boolean): Promise<void> {
        await this.http.put('state', { on: { value: power }})
    }

    async turnOn(): Promise<void> {
        await this.power(true)
    }

    async turnOff(): Promise<void> {
        await this.power(false)
    }

    async getSaturation(): Promise<LimitedValue> {
        let { data } = await this.http.get('state/sat')
        return data
    }

    async setSaturation(sat: number): Promise<void> {
        await this.http.put('state', { sat: { value: sat }})
    }

    async incrementSaturation(amount: number): Promise<void> {
        await this.http.put('state', { sat: { increment: amount }})
    }

    async getBrightness(): Promise<LimitedValue> {
        let { data } = await this.http.get('state/ct')
        return data
    }

    async setBrightness(brightness: number): Promise<void> {
        await this.http.put('state', { brightness: { value: brightness }})
    }

    async increaseBrightness(amount: number): Promise<void> {
        await this.http.put('state', { brightness: { increment: amount }})
    }

    async setDurationBrightness(value: number, duration: number): Promise<void> {
        await this.http.put('state', { brightness: { value, duration }})
    }
}