export interface ComputedPoint {
    x: number
    y: number
    data: {
        id: string
        delta: number
    }
}

export interface Bucket {
    id: string
    delta: number
}

export interface Datum {
    id: string
    name: string
    buckets: Bucket[]
}

export interface ComputedDatum {
    id: string
    index: number
    color: string
    name: string
    data: ComputedPoint[]
}
