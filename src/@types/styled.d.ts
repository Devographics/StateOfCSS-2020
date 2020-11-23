import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        separationBorder: string
        blockShadow: string
        dimensions: {
            spacing: number
            sidebar: {
                width: number
            }
        }
        typography: {
            rootSize: {
                mobile: string
                desktop: string
            }
            size: {
                smaller: string
                small: string
                smallish: string
                medium: string
                large: string
                larger: string
                largest: string
            }
            weight: {
                light: number
                medium: number
                bold: number
            }
        }
        colors: {
            background: string
            backgroundAlt: string
            backgroundInverted: string
            text: string
            textInverted: string
            textHighlight: string
            link: string
            linkActive: string
            contrast: string
            border: string
            heatmap: string
            lineChartDefaultColor: string
            barChartDefaultColor: string
            ranges: {
                tools: {
                    would_use: string
                    would_not_use: string
                    interested: string
                    not_interested: string
                    never_heard: string
                }
                features: {
                    used: string
                    heard: string
                    never_heard: string
                }
                features_simplified: {
                    know_it: string
                    used_it: string
                }
                gender: {
                    male: string
                    female: string
                    non_binary: string
                    prefer_not_to_say: string
                }
                opinions: {
                    4: string
                    3: string
                    2: string
                    1: string
                    0: string
                }
            }
            distinct: string[]
            countries: string[]
        }
        charts: {
            axis: {
                ticks: {
                    line: {
                        fill: string
                    }
                    text: {
                        fill: string
                    }
                }
                legend: {
                    text: {
                        fill: string
                    }
                }
            }
            streamTimelineAxis: {
                ticks: {
                    line: {
                        stroke: string
                    }
                    text: {
                        fill: string
                    }
                }
            }
            tooltip: {
                container: {
                    fontSize: number
                    background: string
                    color: string
                    borderRadius: number
                    boxShadow: string
                }
            }
        }
    }
}
