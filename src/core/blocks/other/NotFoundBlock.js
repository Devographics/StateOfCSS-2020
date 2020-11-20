import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { useI18n } from 'core/i18n/i18nContext'
import { mq, typography, spacing } from 'core/theme'
import TextBlock from 'core/blocks/other/TextBlock'

const NotFoundBlock = ({ block }) => {
    const { translate } = useI18n()
    return <TextBlock text={translate('notfound.description')} />
}

export default NotFoundBlock
