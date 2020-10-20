import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import { getPageLabel } from '../helpers/pageHelpers'
import { typography } from 'core/theme'

const PageHeader = ({ title: _title, showIntro = true, introduction }) => {
    const context = usePageContext()
    const { translate } = useI18n()

    const title = _title || getPageLabel(context, translate)

    return (
        <>
            <PageTitle>{title}</PageTitle>
            {showIntro && introduction && (
                <div dangerouslySetInnerHTML={{ __html: introduction }} />
            )}
        </>
    )
}

const PageTitle = styled.h2`
    font-size: ${typography.size.largest};
`

PageHeader.propTypes = {
    title: PropTypes.string,
    showIntro: PropTypes.bool,
    introduction: PropTypes.node,
}

export default PageHeader
