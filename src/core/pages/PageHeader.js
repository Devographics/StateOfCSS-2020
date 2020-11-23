import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import { getPageLabel } from '../helpers/pageHelpers'

const PageHeader = ({ title: _title, showIntro = true, introduction }) => {
    const context = usePageContext()
    const { translate } = useI18n()
    const page = context
    return (
        <>
            <PageTitle>{getPageLabel(page, translate)}</PageTitle>
        </>
    )
}

const PageTitle = styled.h2`
    font-size: ${(props) => props.theme.typography.size.largest};
`

PageHeader.propTypes = {
    title: PropTypes.string,
    showIntro: PropTypes.bool,
    introduction: PropTypes.node,
}

export default PageHeader
