import React from 'react'
import { ScalePoint, ScaleLinear } from 'd3-scale'
import { useTheme } from 'styled-components'

interface ItemProps {
    id: string
    indexScale: ScalePoint<string>
    valueScale: ScaleLinear<number, number>
    isFirst: boolean
}

export const Item = ({
    indexScale,
    valueScale,
    isFirst,
}: ItemProps) => {
    const theme = useTheme()

    const width = indexScale.range()[1]
    const halfHeight = valueScale.range()[0]

    return (
        <g>
            <g transform={`translate(0, ${halfHeight})`}>
                {isFirst && (
                    <line
                        x1={-40}
                        x2={width + 40}
                        y1={-halfHeight}
                        y2={-halfHeight}
                        stroke={theme.colors.border}
                        opacity={0.2}
                    />
                )}
                <g transform={`translate(0, ${-halfHeight + 10})`}>
                    <text
                        x={-10}
                        textAnchor="end"
                        dy={3}
                        style={{
                            fill: theme.colors.text,
                            fontSize: 10,
                        }}
                    >
                        {`+${valueScale.domain()[1]}%`}
                    </text>
                    <text
                        x={width + 10}
                        textAnchor="start"
                        dy={3}
                        style={{
                            fill: theme.colors.text,
                            fontSize: 10,
                            whiteSpace: 'pre',
                        }}
                    >
                        {`+${valueScale.domain()[1]}%`}
                    </text>
                </g>
                <line
                    x1={-40}
                    x2={width + 40}
                    y1={halfHeight}
                    y2={halfHeight}
                    stroke={theme.colors.border}
                    opacity={0.2}
                />
                <g transform={`translate(0, ${halfHeight - 10})`}>
                    <text
                        x={-10}
                        textAnchor="end"
                        dy={3}
                        style={{
                            fill: theme.colors.text,
                            fontSize: 10,
                        }}
                    >
                        {valueScale.domain()[0]}%
                    </text>
                    <text
                        x={width + 10}
                        textAnchor="start"
                        dy={3}
                        style={{
                            fill: theme.colors.text,
                            fontSize: 10,
                        }}
                    >
                        {valueScale.domain()[0]}%
                    </text>
                </g>
            </g>
        </g>
    )
}
