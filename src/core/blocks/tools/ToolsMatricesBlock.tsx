import React from 'react'
import { BlockContext } from '../types'

export type ToolsMatrixDimension =
    | 'years_of_experience'
    | 'yearly_salary'
    | 'company_size'

export interface ToolsMatrixRange {
    range: string
    count: number
    percentage: number
}

export interface ToolsMatrixBucket {
    id: string
    total: number
    entity: {
        name: string
    }
    ranges: ToolsMatrixRange[]
}

export interface ToolsMatrixYear {
    year: number
    buckets: ToolsMatrixBucket[]
}

export type ToolsMatricesData = Record<ToolsMatrixDimension, {
    year: ToolsMatrixYear
}>

interface ToolsMatricesBlockProps {
    index: number
    block: BlockContext<'toolsMatricesTemplate', 'ToolsMatricesBlock', { toolIds: string }, { sectionId: string }>
    data: ToolsMatricesData
}

const ToolsMatricesBlock = (props: ToolsMatricesBlockProps) => {
    console.log(props.block.blockType)

    return null
}

export default ToolsMatricesBlock
