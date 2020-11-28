import { Entity } from 'core/types'

export const allToolMatrixExperienceIds = [
    'would_use',
    'would_not_use',
    'interested',
    'not_interested',
    'never_heard',
    'usage',
] as const
export type ToolMatrixExperienceId = typeof allToolMatrixExperienceIds[number]

export const allMatrixDimensionIds = [
    'years_of_experience',
    'yearly_salary',
    'company_size',
    'source',
] as const
export type MatrixDimensionId = typeof allMatrixDimensionIds[number]

export interface MatrixBucket {
    id: string
    count: number
    percentage: number
    total_in_range: number
    percentage_from_range: number
    percentage_delta_from_range: number
    percentage_from_experience: number
}

export interface ToolMatrix {
    id: string
    entity: Entity
    buckets: MatrixBucket[]
}

export interface ToolsExperienceDimensionMatrix {
    dimension: MatrixDimensionId
    tools: ToolMatrix[]
}

export interface ToolsExperienceMatrices {
    experience: ToolMatrixExperienceId
    dimensions: ToolsExperienceDimensionMatrix[]
}

export interface Matrices {
    tools: ToolsExperienceMatrices[]
}
