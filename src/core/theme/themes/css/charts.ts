import { DefaultTheme } from 'styled-components'
import defaultsDeep from 'lodash/defaultsDeep'
import charts from '../../charts'
import baseColors from '../../colors'
import colors from './colors'

const cssThemeCharts: DefaultTheme['charts'] = defaultsDeep(
    {
        axis: {
            ticks: {
                line: {
                    fill: colors.text,
                },
                text: {
                    fill: colors.text,
                },
            },
            legend: {
                text: {
                    fill: colors.text,
                },
            },
        },
        streamTimelineAxis: {
            ticks: {
                line: {
                    stroke: colors.text,
                },
                text: {
                    fill: colors.text,
                },
            },
        },
        tooltip: {
            container: {
                fontSize: 14,
                background: baseColors.greyLight,
                color: baseColors.blueDark,
                borderRadius: 0,
                boxShadow: `9px 9px 0 rgba(0, 0, 0, 0.15)`,
            },
        },
    },
    charts
)

export default cssThemeCharts
