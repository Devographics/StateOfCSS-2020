import React from 'react'
import { ScalePoint, ScaleLinear } from 'd3-scale'
import { Line, Area } from 'd3-shape'
import { useTheme } from 'styled-components'
import { ComputedPoint } from './types'
import { NegativePattern } from './NegativePattern'

interface ItemProps {
    id: string
    name: string
    color: string
    indexScale: ScalePoint<string>
    valueScale: ScaleLinear<number, number>
    keys: string[]
    data: {
        id: string
        delta: number
    }[]
    lineGenerator: Line<ComputedPoint>
    areaGenerator: Area<ComputedPoint>
    margin: {
        left: number
        right: number
    }
    isFirst: boolean
}

export const Item = ({
    id,
    name,
    color,
    indexScale,
    valueScale,
    margin,
    isFirst,
}: ItemProps) => {
    const theme = useTheme()

    const width = indexScale.range()[1]
    const halfHeight = valueScale.range()[0]

    const positiveMaskId = `${id}-positiveMask`
    const negativeMaskId = `${id}-negativeMask`
    const negativePatternId = `${id}-negativePattern`

    return (
        <g>
            <g transform={`translate(0, ${halfHeight})`}>
                <defs>
                    <mask id={positiveMaskId}>
                        <rect y={-halfHeight} width={width} height={halfHeight} fill="#ffffff" />
                    </mask>
                    <mask id={negativeMaskId}>
                        <rect width={width} height={halfHeight} fill="#ffffff" />
                    </mask>
                    <NegativePattern id={negativePatternId} color={color} />
                </defs>
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
                <line
                    x1={-margin.left}
                    x2={indexScale.range()[1] + margin.right}
                    fill="none"
                    stroke={color}
                    strokeWidth={1}
                    strokeDasharray={`3 5`}
                />
                <line x2={indexScale.range()[1]} fill="none" stroke={color} strokeWidth={1} />
                <text
                    x={-margin.left}
                    dy={3}
                    stroke={theme.colors.background}
                    strokeMiterlimit="round"
                    style={{
                        fontSize: 12,
                        fontWeight: 600,
                    }}
                    strokeWidth={18}
                >
                    {id}
                </text>
                <text
                    x={-margin.left}
                    dy={3}
                    fill={color}
                    style={{
                        fontSize: 12,
                        fontWeight: 600,
                    }}
                >
                    {name}
                </text>
            </g>
        </g>
    )
}
