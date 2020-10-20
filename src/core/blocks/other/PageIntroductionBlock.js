import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { useI18n } from 'core/i18n/i18nContext'
import { mq, dimensions, typography } from 'core/theme'

const PageIntroductionBlock = ({ block }) => {
    const { translate } = useI18n()
    const { pageId } = block.variables

    return <Introduction source={translate(`sections.${pageId}.introduction`)} />
}

const Introduction = styled(ReactMarkdown)`
    @media ${mq.smallMedium} {
        margin-bottom: ${dimensions.spacing * 2}px;
    }

    @media ${mq.large} {
        font-size: ${typography.size.large};
        margin-bottom: ${dimensions.spacing * 4}px;
    }
`

export default PageIntroductionBlock
