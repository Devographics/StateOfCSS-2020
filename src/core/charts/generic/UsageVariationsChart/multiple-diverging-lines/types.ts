export interface ComputedPoint {
    x: number
    y: number
    data: {
        index: string
        value: number
    }
}

export interface PointDatum {
    index: string
    value: number
}

export interface Datum {
    id: string
    name: string
    data: PointDatum[]
}

export interface ComputedDatum {
    id: string
    index: number
    color: string
    name: string
    data: ComputedPoint[]
}
