import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import StreamChart from 'core/charts/generic/StreamChart'
import { useI18n } from 'core/i18n/i18nContext'
import { useBucketKeys } from 'core/helpers/useBucketKeys'
import GaugeBarChart from 'core/charts/generic/GaugeBarChart'
import { usePageContext } from 'core/helpers/pageContext'

const ToolExperienceBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {

    const context = usePageContext()
    const { locale } = context

    const { blockName } = block
    const [units, setUnits] = useState(defaultUnits)
    const [current, setCurrent] = useState(null)
    const { translate } = useI18n()

    const name = get(data, 'entity.name')
    // const title = translate(`blocks.${blockName}.title`, { values: { name } })
    // const description = translate(`blocks.${blockName}.description`, { values: { name } })

    const title = get(data, 'entity.name')
    const titleLink = get(data, 'entity.homepage')
    const description = locale.id === 'en-US' && get(data, 'entity.description')

    const chartData = get(data, 'experience.all_years')

    const buckets = get(data, 'experience.all_years.0.buckets', [])

    const bucketKeys = useBucketKeys('tools')
    const colors = useMemo(() => bucketKeys.map((key) => key.color), [bucketKeys])

    if (!chartData || isEmpty(chartData)) {
        return <div>no data</div>
    }


    return (
        <Block
            units={units}
            setUnits={setUnits}
            block={{ ...block, title, titleLink, description, showDescription: !!description }}
            data={chartData}
            legendProps={{
                onMouseEnter: ({ id }) => {
                    setCurrent(id)
                },
                onMouseLeave: () => {
                    setCurrent(null)
                },
            }}
            setCurrent={setCurrent}
        >
            <ChartContainer height={40} fit={true}>
                <GaugeBarChart
                    buckets={buckets}
                    colorMapping={bucketKeys}
                    units={units}
                    applyEmptyPatternTo="never_heard"
                    i18nNamespace="options.tools"
                />
                {/* <StreamChart
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
                /> */}
            </ChartContainer>
        </Block>
    )
}

ToolExperienceBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataPath: PropTypes.string.isRequired,
    }).isRequired,
}

export default ToolExperienceBlock
