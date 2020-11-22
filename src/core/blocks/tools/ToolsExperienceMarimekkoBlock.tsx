import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { keyBy, sortBy } from 'lodash'
import { ResponsiveMarimekko, ComputedDatum } from '@nivo/marimekko'
import { useTheme } from '@nivo/core'
import { keys } from 'core/constants'
import { useI18n } from 'core/i18n/i18nContext'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import { Entity } from 'core/types'
import { BlockContext } from '../types'

export interface ToolExperienceBucket {
    id: string
    count: number
    percentage: number
}

export interface ToolsExperienceToolData {
    id: string
    entity: Entity
    experience: {
        year: {
            buckets: ToolExperienceBucket[]
        }
    }
}

interface ToolsExperienceMarimekkoBlockProps {
    index: number
    block: BlockContext<
        'toolsExperienceMarimekkoTemplate',
        'ToolsExperienceMarimekkoBlock',
        { toolIds: string },
        any
    >
    data: ToolsExperienceToolData[]
}

const experienceKeys = keyBy(keys.tools.keys, 'id')

const valueFormatter = (value: number) => `${Math.abs(Math.round(value))}%`

const ToolsLabels = (props: { data: ComputedDatum<any>[] }) => {
    const theme = useTheme()
    console.log(props)

    return (
        <g>
            {props.data.map((datum) => {
                return (
                    <g key={datum.id} transform={`translate(-160, ${datum.y + datum.height / 2})`}>
                        <text style={theme.axis.ticks.text}>{datum.id}</text>
                    </g>
                )
            })}
        </g>
    )
}

export const ToolsExperienceMarimekkoBlock = (props: ToolsExperienceMarimekkoBlockProps) => {
    const theme = useContext(ThemeContext)

    const { translate } = useI18n()
    const title = translate(`blocks.tools_section_overview.title`)
    const description = translate(`blocks.tools_section_overview.description`)

    const dimensions = useMemo(
        () => [
            {
                id: translate(experienceKeys.not_interested.label),
                value: experienceKeys.not_interested.id,
            },
            {
                id: translate(experienceKeys.would_not_use.label),
                value: experienceKeys.would_not_use.id,
            },
            {
                id: translate(experienceKeys.interested.label),
                value: experienceKeys.interested.id,
            },
            {
                id: translate(experienceKeys.would_use.label),
                value: experienceKeys.would_use.id,
            },
        ],
        [translate]
    )

    const colors = useMemo(
        () => [
            theme.colors.ranges.tools.not_interested,
            theme.colors.ranges.tools.would_not_use,
            theme.colors.ranges.tools.interested,
            theme.colors.ranges.tools.would_use,
        ],
        [theme]
    )

    let normalizedData = useMemo(() => {
        return sortBy(
            props.data.map((tool) => {
                const keyedBuckets = keyBy(tool.experience.year.buckets, 'id')

                return {
                    tool: tool.entity.name,
                    awareness: 100 - keyedBuckets.never_heard.percentage,
                    would_not_use: keyedBuckets.would_not_use.percentage * -1,
                    not_interested: keyedBuckets.not_interested.percentage * -1,
                    interested: keyedBuckets.interested.percentage,
                    would_use: keyedBuckets.would_use.percentage,
                }
            }),
            (d) => d.interested + d.would_use
        ).reverse()
    }, [props.data])

    return (
        <Block
            block={{
                ...props.block,
                title,
                description,
            }}
            data={props.data}
        >
            <ChartContainer fit height={normalizedData.length * 40 + 80}>
                <ResponsiveMarimekko
                    margin={{
                        top: 40,
                        bottom: 40,
                        left: 160,
                    }}
                    axisTop={{
                        format: valueFormatter,
                    }}
                    axisBottom={{
                        format: valueFormatter,
                    }}
                    id="tool"
                    value="awareness"
                    valueFormat={valueFormatter}
                    data={normalizedData}
                    dimensions={dimensions}
                    theme={theme.charts}
                    colors={colors}
                    enableGridX
                    enableGridY={false}
                    offset="diverging"
                    layout="horizontal"
                    animate={false}
                    innerPadding={3}
                    layers={['grid', 'axes', ToolsLabels, 'bars']}
                />
            </ChartContainer>
        </Block>
    )
}
