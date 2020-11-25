import removeMarkdown from 'remove-markdown'
import { getTranslationValuesFromContext, getPageLabel } from '../helpers/pageHelpers'

export const getBlockTitle = (
    block,
    context,
    translate,
) => {
    const { blockName } = block
    const page = context

    let blockTitle

    if (block.title) {
        blockTitle = block.title
    } else if (block.titleId) {
        blockTitle = translate(block.titleId)
    } else if (blockName) {
        blockTitle = translate(`blocks.${blockName}.title`)
    } else {
        // for _others blocks (freeform answers), replace suffix with ".others"
        const id = block.id.replace('_others', '.others')
        blockTitle = translate(`${page.i18nNamespace || page.id}.${id}`)
    }

    return blockTitle
}

export const getBlockDescription = (
    block,
    context,
    translate,
) => {
    const { blockName } = block
    const page = context
    let blockDescription

    if (block.description) {
        blockDescription = block.description
    } else if (block.descriptionId) {
        blockDescription = translate(block.descriptionId)
    } else if (blockName) {
        blockDescription = translate(`blocks.${blockName}.description`)
    } else {
        // for _others blocks (freeform answers), replace suffix with ".others"
        const id = block.id.replace('_others', '.others')
        blockDescription = translate(`${page.i18nNamespace || page.id}.${id}.description`, {}, null)
    }

    return blockDescription
}

export const getBlockImage = (block, context, translate) => {
    return `${context.host}/images/captures/${block.id}.png`
}

export const getBlockMeta = (block, context, translate, title) => {
    const { id } = block
    const link = `${context.host}${context.currentPath}${id}`
    const trackingId = `${context.currentPath}${id}`.replace(/^\//, '')

    title = title || getBlockTitle(block, context, translate)

    const imageUrl = getBlockImage(block, context, translate)

    const twitterText = translate('share.block.twitter_text', {
        values: {
            title,
            link,
        },
    })

    const emailSubject = translate('share.block.subject')
    const emailBody = translate('share.block.body', {
        values: {
            title,
            link,
        },
    })

    return {
        link,
        trackingId,
        title,
        twitterText,
        emailSubject,
        emailBody,
        imageUrl,
    }
}
