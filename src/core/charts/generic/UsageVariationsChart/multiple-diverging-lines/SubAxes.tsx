import React from 'react'
import { ScaleLinear } from 'd3-scale'
import { useTheme } from '@nivo/core'
import { ComputedDatum } from './types'

interface SubAxesProps {
    data: ComputedDatum[]
    valueScale: ScaleLinear<number, number>
    itemHeight: number
    width: number
}

export const SubAxes = ({ data, valueScale, itemHeight, width }: SubAxesProps) => {
    const theme = useTheme()

    const textStyle = {
        ...(theme.axis.ticks.text as any),
        fontSize: 10,
    }

    return (
        <g>
            {data.map((datum) => {
                return (
                    <g key={datum.id} transform={`translate(0, ${datum.index * itemHeight})`}>
                        {datum.index === 0 && (
                            <line x1={-40} x2={width + 40} {...(theme.grid.line as any)} />
                        )}
                        <g transform={`translate(0, ${10})`}>
                            <text x={-10} textAnchor="end" dy={3} style={textStyle}>
                                {`+${valueScale.domain()[1]}%`}
                            </text>
                            <text x={width + 10} textAnchor="start" dy={3} style={textStyle}>
                                {`+${valueScale.domain()[1]}%`}
                            </text>
                        </g>
                        <g transform={`translate(0, ${itemHeight - 10})`}>
                            <text x={-10} textAnchor="end" dy={3} style={textStyle}>
                                {valueScale.domain()[0]}%
                            </text>
                            <text x={width + 10} textAnchor="start" dy={3} style={textStyle}>
                                {valueScale.domain()[0]}%
                            </text>
                        </g>
                        <g transform={`translate(0, ${itemHeight})`}>
                            <line x1={-40} x2={width + 40} {...(theme.grid.line as any)} />
                        </g>
                    </g>
                )
            })}
        </g>
    )
}
