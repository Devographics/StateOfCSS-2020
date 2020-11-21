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
import styled from 'styled-components'
import { mq, spacing, fontSize } from 'core/theme'

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

    const allYears = get(data, 'experience.all_years')

    // const buckets = get(data, 'experience.all_years.0.buckets', [])

    const bucketKeys = useBucketKeys('tools')
    const colors = useMemo(() => bucketKeys.map((key) => key.color), [bucketKeys])

    if (!allYears || isEmpty(allYears)) {
        return <div>no data</div>
    }

    const isLastYear = (year) =>
        allYears.findIndex((y) => y.year === year.year) === allYears.length - 1

    return (
        <Block
            units={units}
            setUnits={setUnits}
            block={{ ...block, title, titleLink, description, showDescription: !!description }}
            data={allYears}
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
            {allYears.map((year) => (
                <Row key={year.year}>
                    <RowYear>{year.year}</RowYear>
                    <ChartContainer height={40} fit={true} className="ToolChart">
                        <GaugeBarChart
                            buckets={year.buckets}
                            colorMapping={bucketKeys}
                            units={units}
                            applyEmptyPatternTo="never_heard"
                            i18nNamespace="options.tools"
                            showProgression={isLastYear(year)}
                        />
                    </ChartContainer>
                </Row>
            ))}
        </Block>
    )
}

const Row = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: ${spacing()};
    align-items: center;
    margin-bottom: ${spacing()};
`

const RowYear = styled.h4`
    margin: 0;
`

ToolExperienceBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataPath: PropTypes.string.isRequired,
    }).isRequired,
}

export default ToolExperienceBlock
