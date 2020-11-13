import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import { useI18n } from 'core/i18n/i18nContext'
import StreamChart from 'core/charts/generic/StreamChart'
import { useBucketKeys } from 'core/helpers/useBucketKeys'
import styled from 'styled-components'
import { mq, spacing } from 'core/theme'

const ToolsSectionStreamsBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)
    const [current, setCurrent] = useState(null)
    const { id, bucketKeysName = id } = block

    const { translate } = useI18n()
    const title = translate(`blocks.tools_section_streams.title`)
    const description = translate(`blocks.tools_section_streams.description`)

    // exclude tools having no aggregations available,
    // typically happens for previous years when new tools
    // were added.
    const filteredData = data.filter((datum) => {
        if (datum.experience.year === null) {
            console.info(`[ToolsSectionStreamsBlock] no data available for tool: ${datum.id}`)
            return false
        }

        return true
    })

    return (
        <Block
            units={units}
            setUnits={setUnits}
            block={{
                ...block,
                title,
                description,
                legendPosition: 'top'
            }}
            data={data}
            legendProps={{
                onMouseEnter: ({ id }) => {
                    setCurrent(id)
                },
                onMouseLeave: () => {
                    setCurrent(null)
                },
            }}
        >
            {/* <ChartContainer height={400}> */}
                {/* <ToolsSectionStreamsChart
                    data={filteredData}
                    units={units}
                    current={current}
                    namespace={bucketKeysName}
                /> */}
                <GridContainer>
                {data.map((toolData) => (
                    <Stream toolData={toolData} current={current} units={units} />
                ))}
                </GridContainer>
            {/* </ChartContainer> */}
        </Block>
    )
}

const Stream = ({ toolData, current, units }) => {
    const chartData = toolData.experience.all_years
    const bucketKeys = useBucketKeys('tools')

    const colors = useMemo(() => bucketKeys.map((key) => key.color), [bucketKeys])

    return (
        <div>
        <StreamChart
            colorScale={colors}
            current={current}
            // for tools only having one year of data, we duplicate the year's data
            // to be able to use the stream chart.
            data={chartData.length === 1 ? [chartData[0], chartData[0]] : chartData}
            keys={bucketKeys.map((k) => k.id)}
            bucketKeys={bucketKeys}
            units={units}
            applyEmptyPatternTo="never_heard"
            namespace="options.tools"
        />
        <StreamTitle><a href={toolData.entity.homepage}>{toolData.entity.name}</a></StreamTitle>
        </div>
    )
}

const GridContainer = styled.div`
    @media ${mq.small} {
        margin-bottom: ${spacing(2)};
    }

    @media ${mq.mediumLarge} {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
        column-gap: ${spacing(3)};
        row-gap: ${spacing(3)};
    }
`

const StreamTitle = styled.h4`
    text-align: center;
`

ToolsSectionStreamsBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            entity: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
            experience: PropTypes.shape({
                year: PropTypes.shape({
                    buckets: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired,
                        })
                    ).isRequired,
                }).isRequired,
            }),
        })
    ).isRequired,
}

export default ToolsSectionStreamsBlock
