import React, { useState } from 'react'
import { random } from 'lodash'
import { BlockContext } from 'core/blocks/types'
// @ts-ignore
import Block from 'core/blocks/block/Block'
import { RangesMultipleDivergingLines } from 'core/charts/generic/RangesMultipleDivergingLines'
import { keys } from 'core/bucket_keys'
import { RangeType } from './types'
import { Switcher } from './Switcher'

interface ToolsRangesMultipleDivergingLinesBlockProps {
    block: BlockContext<
        'toolsRangesDeltaJoyPlotTemplate',
        'ToolsRangesDeltaJoyPlotBlock',
        { toolIds: string },
        any
    >
    data: any
}

const tools = [
    {
        id: 'sass',
        name: 'Sass',
    },
    {
        id: 'less',
        name: 'Less',
    },
    {
        id: 'postcss',
        name: 'PostCSS',
    },
    {
        id: 'stylus',
        name: 'Stylus',
    },
    /*
    {
        id: 'a',
        name: 'Stylus',
    },
    {
        id: 'b',
        name: 'Stylus',
    },
    {
        id: 'c',
        name: 'Stylus',
    },
    {
        id: 'd',
        name: 'Stylus',
    },
    {
        id: 'e',
        name: 'Stylus',
    },
    {
        id: 'f',
        name: 'Stylus',
    },
    {
        id: 'g',
        name: 'Stylus',
    },
     */
]

const generateSampleData = (keyIds: string[]) => {
    return tools.map((tool) => ({
        ...tool,
        buckets: keyIds.map((key) => ({
            id: key,
            delta: random(-10, 10),
        })),
    }))
}

const yearsOfExperienceKeys = keys.years_of_experience.keys.map((key) => key.id)
const yearlySalaryKeys = keys.yearly_salary.keys.map((key) => key.id)
const companySizeKeys = keys.company_size.keys.map((key) => key.id)

const sampleData = {
    years_of_experience: {
        keys: yearsOfExperienceKeys,
        data: generateSampleData(yearsOfExperienceKeys),
    },
    yearly_salary: {
        keys: yearlySalaryKeys,
        data: generateSampleData(yearlySalaryKeys),
    },
    company_size: {
        keys: companySizeKeys,
        data: generateSampleData(companySizeKeys),
    },
}

const CHART_MARGIN = {
    top: 170,
    right: 40,
    bottom: 50,
    left: 140,
}

export const ToolsRangesMultipleDivergingLinesBlock = ({
    block,
}: ToolsRangesMultipleDivergingLinesBlockProps) => {
    const [rangeType, setRangeType] = useState<RangeType>('years_of_experience')

    const { keys, data } = sampleData[rangeType]

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
                    height: CHART_MARGIN.top + data.length * 100 + CHART_MARGIN.bottom,
                }}
            >
                <RangesMultipleDivergingLines
                    data={data}
                    keys={keys}
                    i18nNamespace={rangeType}
                    margin={CHART_MARGIN}
                />
            </div>
        </Block>
    )
}
