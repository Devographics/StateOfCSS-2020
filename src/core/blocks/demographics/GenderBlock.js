import React, { memo, useState, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import { keys } from 'core/constants'
import Block from 'core/blocks/block/Block'
import GaugeBarChart from 'core/charts/generic/GaugeBarChart'
import ChartContainer from 'core/charts/ChartContainer'

const GenderBlock = ({ block, data }) => {
    const { id, units: defaultUnits = 'percentage' } = block
    const [units, setUnits] = useState(defaultUnits)
    const theme = useContext(ThemeContext)

    const colorMapping = useMemo(
        () =>
            keys.gender.keys.map((item) => ({
                ...item,
                color: theme.colors.ranges.gender[item.id],
            })),
        [theme]
    )

    return (
        <Block units={units} setUnits={setUnits} data={data} block={block}>
            <ChartContainer height={200} fit={true}>
                <GaugeBarChart
                    units={units}
                    buckets={data.buckets}
                    colorMapping={colorMapping}
                    i18nNamespace="options.gender"
                />
            </ChartContainer>
        </Block>
    )
}

GenderBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    data: PropTypes.shape({
        buckets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
}

export default memo(GenderBlock)
