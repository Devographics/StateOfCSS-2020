import React, { useCallback } from 'react'
import { useTheme } from 'styled-components'
import { TickFormatter } from '@nivo/axes'
// @ts-ignore
import { useI18n } from 'core/i18n/i18nContext'
import { ResponsiveMultipleDivergingLines } from './multiple-deverging-lines'

export const RangesMultipleDivergingLines = ({ margin, data, keys, i18nNamespace }: any) => {
    const theme = useTheme()
    const { translate } = useI18n()

    const translateTick = useCallback(
        (key: string) => translate(`options.${i18nNamespace}.${key}.short`) as string,
        [translate, i18nNamespace]
    ) as TickFormatter

    return (
        <ResponsiveMultipleDivergingLines
            data={data}
            keys={keys}
            i18nNamespace={i18nNamespace}
            theme={theme.charts}
            colors={theme.colors.distinct}
            margin={margin}
            animate={false}
            motionConfig="gentle"
            axisTop={{
                format: translateTick,
                legend: translate(`charts.axis_legends.${i18nNamespace}`),
                legendPosition: 'middle',
                legendOffset: -46,
            }}
        />
    )
}
