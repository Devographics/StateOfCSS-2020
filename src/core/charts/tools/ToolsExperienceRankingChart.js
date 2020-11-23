import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { useTheme } from 'styled-components'
import { ResponsiveBump } from '@nivo/bump'
import { BasicTooltip } from '@nivo/tooltip'

const CustomPoint = (props) => {
    const theme = useTheme()
    const { x, y, data, isInactive, size, borderColor, borderWidth } = props

    const transition = useSpring({
        transform: `translate(${x}, ${y})`,
    })

    return (
        <animated.g transform={transition.transform} style={{ pointerEvents: 'none' }}>
            <circle r={(size + borderWidth) / 2} cy={size / 5} fill="rgba(0, 0, 0, .2)" />
            <circle
                r={size / 2}
                fill={theme.colors.background}
                stroke={borderColor}
                strokeWidth={borderWidth}
            />
            {!isInactive && (
                <text textAnchor="middle" y={4} fill={theme.colors.text} fontSize="11px">
                    {Math.round(data.percentage)}%
                </text>
            )}
        </animated.g>
    )
}

const CustomTooltip = ({ name, color }) => (
    <BasicTooltip id={name} enableChip={true} color={color} />
)

const ToolsExperienceRankingChart = ({ data }) => {
    const theme = useTheme()

    return (
        <ResponsiveBump
            data={data}
            margin={{ top: 40, right: 120, bottom: 40, left: 120 }}
            colors={theme.colors.distinct}
            inactiveLineWidth={5}
            theme={theme.charts}
            enableGridX={true}
            enableGridY={false}
            axisTop={{
                tickSize: 0,
                tickPadding: 9,
            }}
            axisRight={null}
            axisBottom={{
                tickSize: 0,
                tickPadding: 9,
            }}
            axisLeft={null}
            startLabel={(d) => d.name}
            startLabelTextColor={{
                from: 'color',
                modifiers: [['brighter', 1]],
            }}
            startLabelPadding={20}
            endLabel={(d) => d.name}
            endLabelTextColor={{
                from: 'color',
                modifiers: [['brighter', 1]],
            }}
            endLabelPadding={20}
            pointComponent={CustomPoint}
            lineWidth={5}
            pointSize={36}
            pointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            activeLineWidth={8}
            activePointSize={42}
            activePointBorderWidth={4}
            inactivePointSize={0}
            inactivePointBorderWidth={2}
            tooltip={({ serie }) => <CustomTooltip {...serie} />}
        />
    )
}

ToolsExperienceRankingChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.number.isRequired,
                    y: PropTypes.number,
                    percentage: PropTypes.number,
                })
            ).isRequired,
        })
    ).isRequired,
}

export default ToolsExperienceRankingChart
