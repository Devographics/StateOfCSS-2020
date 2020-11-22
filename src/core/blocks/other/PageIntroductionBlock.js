import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { useI18n } from 'core/i18n/i18nContext'
import { mq, typography, spacing } from 'core/theme'

const PageIntroductionBlock = ({ block }) => {
    const { translate } = useI18n()
    return (
        <Introduction
            className="Page__Introduction"
            source={translate(`sections.${block.pageId}.description`)}
        />
    )
}

const Introduction = styled(ReactMarkdown)`
    @media ${mq.smallMedium} {
        margin-bottom: ${spacing(2)};
    }

    @media ${mq.large} {
        font-size: ${typography.size.large};
        margin-bottom: ${spacing(4)};
    }
`

export default PageIntroductionBlock
