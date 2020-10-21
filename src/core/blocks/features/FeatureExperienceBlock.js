import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import { useI18n } from 'core/i18n/i18nContext'
import ChartContainer from 'core/charts/ChartContainer'
import GaugeBarChart from 'core/charts/generic/GaugeBarChart'
import { usePageContext } from 'core/helpers/pageContext'
import { useBucketKeys } from 'core/helpers/useBucketKeys'

// convert relative links into absolute MDN links
const parseMDNLinks = (content) =>
    content.replace(new RegExp(`href="/`, 'g'), `href="https://developer.mozilla.org/`)

const FeatureExperienceBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)

    const context = usePageContext()
    const { locale } = context
    const { translate } = useI18n()
    const { name, mdn } = data

    const buckets = data.experience.year.buckets
    const bucketKeys = useBucketKeys('features')

    const mdnLink = mdn && `https://developer.mozilla.org${mdn.url}`
    // only show descriptions for english version
    const description =
        locale === 'en-US' &&
        mdn &&
        `${parseMDNLinks(mdn.summary)} <a href="${mdnLink}">${translate('feature.mdn_link')}</a>`

    return (
        <Block
            title={name}
            units={units}
            setUnits={setUnits}
            data={{
                completion: data.experience.year.completion,
                buckets,
            }}
            block={{ ...block, title: name, description }}
        >
            <ChartContainer height={40} fit={true} className="FeatureChart">
                <GaugeBarChart
                    buckets={buckets}
                    colorMapping={bucketKeys}
                    units={units}
                    applyEmptyPatternTo="never_heard"
                    i18nNamespace="options.features"
                />
            </ChartContainer>
        </Block>
    )
}

FeatureExperienceBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    }).isRequired,
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        experience: PropTypes.shape({
            year: PropTypes.shape({
                year: PropTypes.number.isRequired,
                completion: PropTypes.shape({
                    count: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired,
                }).isRequired,
                buckets: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        usage: PropTypes.shape({
                            total: PropTypes.number.isRequired,
                            buckets: PropTypes.arrayOf(
                                PropTypes.shape({
                                    id: PropTypes.string.isRequired,
                                    count: PropTypes.number.isRequired,
                                    percentage: PropTypes.number.isRequired,
                                })
                            ).isRequired,
                        }),
                    })
                ).isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
}

export default FeatureExperienceBlock
