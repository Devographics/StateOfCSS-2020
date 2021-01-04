import React from 'react'
import { Redirect, useLocation } from '@reach/router'
import { getBlockTitle, getBlockDescription } from 'core/helpers/blockHelpers'
import { mergePageContext } from '../helpers/pageHelpers'
import PageMeta from '../pages/PageMeta'
import PageMetaDebug from '../pages/PageMetaDebug'
import config from 'config/config.yml'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from 'core/helpers/pageContext'

const ShareBlockTemplate = () => {
    const pageContext = usePageContext()
    const { block } = pageContext
    const location = useLocation()
    const { translate } = useI18n()
    const context = mergePageContext(pageContext, location)

    let redirect = context.redirect

    const blockTitle = getBlockTitle(block, context, translate, {
        format: 'full',
    })
    const blockDescription = getBlockDescription(context.block, context, translate, {
        isMarkdownEnabled: false,
    })
    const overrides = {
        title: `${config.siteTitle}: ${blockTitle} ${config.hashtag}`,
    }
    if (blockDescription) {
        overrides.description = blockDescription
    }

    if (context.isReportRedirect) {
        redirect = `${context.host}${context.locale.path}/report#${context.block.id}`
    }

    return (
        <div className="template">
            <PageMeta overrides={overrides} />
            <PageMetaDebug overrides={overrides} />
            {!context.isDebugEnabled && <Redirect to={redirect} noThrow />}
            Redirecting to <code>{redirect}</code>…
        </div>
    )
}

export default ShareBlockTemplate
