import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { keys } from 'core/constants'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from 'core/charts/generic/VerticalBarChart'
import { usePageContext } from 'core/helpers/pageContext'
import range from 'lodash/range'
import sumBy from 'lodash/sumBy'

const groupBy = 10

const KnowledgeScoreBlock = ({ block, data }) => {
    if (!data) {
        throw new Error(
            `KnowledgeScoreBlock: Missing data for block ${block.id}, page data is undefined`
        )
    }
    const {
        id,
        mode = 'relative',
        units: defaultUnits = 'percentage',
        translateData,
        i18nNamespace,
    } = block

    const context = usePageContext()
    const { width } = context

    const [units, setUnits] = useState(defaultUnits)

    const { buckets, total, completion } = data

    const bucketKeys = range(0, 100 / groupBy).map(n => ({id: n, shortLabel: `${n * groupBy}-${(n + 1) * groupBy}%`}))

    const groupedBuckets = range(0, 100 / groupBy).map((n) => {
        const selectedBuckets = buckets.filter(
            (b) => b.id >= n * groupBy && b.id < (n + 1) * groupBy
        )
        return {
            id: n,
            count: sumBy(selectedBuckets, 'count'),
            percentage: Math.round(100 * sumBy(selectedBuckets, 'percentage')) / 100,
        }
    })

    return (
        <Block
            units={units}
            setUnits={setUnits}
            completion={completion}
            data={data}
            block={block}
            legendProps={{ layout: 'vertical' }}
        >
            <ChartContainer fit={true}>
                <VerticalBarChart
                    bucketKeys={bucketKeys}
                    total={total}
                    buckets={groupedBuckets}
                    i18nNamespace={i18nNamespace || id}
                    translateData={translateData}
                    mode={mode}
                    units={units}
                    viewportWidth={width}
                    showTooltips={false}
                />
            </ChartContainer>
        </Block>
    )
}

KnowledgeScoreBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataPath: PropTypes.string.isRequired,
        bucketKeysName: PropTypes.oneOf(Object.keys(keys)),
        showDescription: PropTypes.bool,
        mode: PropTypes.oneOf(['absolute', 'relative']),
        units: PropTypes.oneOf(['percentage', 'count']),
    }).isRequired,
    data: PropTypes.shape({
        buckets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
    }).isRequired,
}

export default memo(KnowledgeScoreBlock)
