export interface Info {
    name: string,
    serialNo: string,
    manufacturer: string,
    firmwareVersion: string,
    model: string,
    state: {
        on: {
            value: boolean
        },
        brightness: {
            value: number
            max: number,
            min: number
        },
        hue: {
            value: number,
            max: number,
            min: number
        },
        sat: {
            value: number,
            max: number,
            min: number
        },
        ct: {
            value: number,
            max: number,
            min: number
        },
        colorMode: string,
    },
    effects: {
        select: string,
        effectsList: string[]
    },
    panelLayout: {
        layout: {
            numPanels: number,
            sideLength: number,
            positionData: [
                {
                    panelId: number,
                    x: number,
                    y: number
                    o: number,
                    shapeType: number
                }
            ]
        }
    },
    globalOrientation: {
        value: number
        max: number,
        min: number
    },
    rythm?: {
        rhythmConnected: boolean,
        rhythmActive: boolean,
        rhythmId: number,
        hardwareVersion: string,
        firmwareVersion: string,
        auxAvailable: boolean,
        rhythmMode: number,
        rhythmPos: {
            x: number,
            y: number
            o: number
        }
    }
}

export interface HttpResponse {
    status: number,
    data: any
    statusText: string
}

export interface LimitedValue {
    min: number,
    max: number
    value: number
}