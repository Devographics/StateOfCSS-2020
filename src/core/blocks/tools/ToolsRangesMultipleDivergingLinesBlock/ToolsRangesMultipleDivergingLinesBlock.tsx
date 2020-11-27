import React, {useMemo, useState} from 'react'
import { BlockContext } from 'core/blocks/types'
// @ts-ignore
import Block from 'core/blocks/block/Block'
import { RangesMultipleDivergingLines } from 'core/charts/generic/RangesMultipleDivergingLines'
import { keys } from 'core/bucket_keys'
import { Entity } from 'core/types'
import { RangeType } from './types'
import { Switcher } from './Switcher'

interface ToolsMatrixYear {
    year: {
        tools: {
            id: string
            entity: Entity
            ranges: {
                range: string
                count: number
                percentage_from_range: number
                percentage_delta_from_range: number
            }[]
        }[]
    }
}

interface ToolsRangesMultipleDivergingLinesBlockProps {
    block: BlockContext<
        'toolsRangesDeltaJoyPlotTemplate',
        'ToolsRangesDeltaJoyPlotBlock',
        { toolIds: string },
        any
    >
    data: Record<RangeType, ToolsMatrixYear>
}

const keysByRangeType: Record<RangeType, string[]> = {
    years_of_experience: keys.years_of_experience.keys.map((key) => key.id),
    yearly_salary: keys.yearly_salary.keys.map((key) => key.id),
    company_size: keys.company_size.keys.map((key) => key.id),
}

const CHART_MARGIN = {
    top: 170,
    right: 40,
    bottom: 50,
    left: 140,
}

export const ToolsRangesMultipleDivergingLinesBlock = ({
    data,
    block,
}: ToolsRangesMultipleDivergingLinesBlockProps) => {
    const [rangeType, setRangeType] = useState<RangeType>('years_of_experience')

    const keys = keysByRangeType[rangeType]
    const rangeTypeData = data[rangeType].year.tools

    const normalizedData = useMemo(() => rangeTypeData.map((datum) => {
        return {
            id: datum.id,
            name: datum.entity.name,
            data: keys.map((key) => {
                const range = datum.ranges.find((range) => range.range === key)

                return {
                    index: key,
                    value: range?.percentage_delta_from_range ?? 0,
                }
            }),
        }
    }), [data, keys])

    return (
        <Block
            block={block}
            data={data}
            titleProps={{
                switcher: <Switcher setRangeType={setRangeType} rangeType={rangeType} />,
            }}
        >
            <div
                style={{
                    maxWidth: 900,
                    height: CHART_MARGIN.top + rangeTypeData.length * 60 + CHART_MARGIN.bottom,
                }}
            >
                <RangesMultipleDivergingLines
                    data={normalizedData}
                    keys={keys}
                    i18nNamespace={rangeType}
                    margin={CHART_MARGIN}
                />
            </div>
        </Block>
    )
}
