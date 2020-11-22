import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import last from 'lodash/last'
import ReactMarkdown from 'react-markdown/with-html'
import { mq, spacing } from 'core/theme'
import ShareBlock from 'core/share/ShareBlock'
import BlockExport from 'core/blocks/block/BlockExport'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from 'core/helpers/pageContext'
// import { getBlockTitle, getBlockDescription } from 'core/helpers/blockHelpers'
import { getBlockMeta } from 'core/helpers/blockHelpers'
import SharePermalink from 'core/share/SharePermalink'
import BlockUnitsSelector from 'core/blocks/block/BlockUnitsSelector'
import BlockCompletionIndicator from 'core/blocks/block/BlockCompletionIndicator'

const BlockTitle = ({
    isShareable,
    isExportable = true,
    values,
    units,
    setUnits,
    data,
    block,
    switcher,
}) => {
    const { id, blockName, titleLink, showDescription = true } = block
    const completion = data && (Array.isArray(data) ? last(data).completion : data.completion)
    const [showOptions, setShowOptions] = useState(false)
    const context = usePageContext()
    const { translate } = useI18n()
    const page = context

    let blockTitle
    if (block.title) {
        blockTitle = block.title
    } else if (block.titleId) {
        blockTitle = translate(block.titleId)
    } else if (blockName) {
        blockTitle = translate(`blocks.${blockName}.title`)
    } else {
        // blockTitle = getBlockTitle(block, context, translate, { values })
        // for _others blocks (freeform answers), replace suffix with ".others"
        const id = block.id.replace('_others', '.others')
        blockTitle = translate(`${page.i18nNamespace || page.id}.${id}`)
    }

    let blockDescription
    if (block.description) {
        blockDescription = block.description
    } else if (block.descriptionId) {
        blockDescription = translate(block.descriptionId)
    } else if (blockName) {
        blockDescription = translate(`blocks.${blockName}.description`)
    } else {
        // blockDescription = getBlockDescription(block, context, translate, { values })
        // for _others blocks (freeform answers), replace suffix with ".others"
        const id = block.id.replace('_others', '.others')
        blockDescription = translate(`${page.i18nNamespace || page.id}.${id}.description`, {}, null)
    }

    const meta = getBlockMeta(block, context, translate)

    return (
        <>
            <StyledBlockTitle
                className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}
            >
                <LeftPart>
                    <BlockTitleText className="BlockTitleText">
                        <SharePermalink url={meta.link} />
                        {titleLink ? <a href={titleLink}>{blockTitle}</a> : blockTitle}
                    </BlockTitleText>
                    {completion && <BlockCompletionIndicator completion={completion} />}
                    {isExportable && block && (
                        <BlockExport
                            id={id}
                            data={data}
                            block={block}
                            title={blockTitle}
                            className="Block__Title__Export"
                        />
                    )}
                    {isShareable && (
                        <ShareBlock
                            block={block}
                            className="Block__Title__Share"
                            values={values}
                            title={blockTitle}
                            toggleClass={() => {
                                setShowOptions(!showOptions)
                            }}
                        />
                    )}
                </LeftPart>
                {switcher ? (
                    <BlockChartControls className="BlockChartControls">
                        {switcher}
                    </BlockChartControls>
                ) : (
                    units &&
                    setUnits && (
                        <BlockChartControls className="BlockChartControls">
                            <BlockUnitsSelector units={units} onChange={setUnits} />
                        </BlockChartControls>
                    )
                )}
            </StyledBlockTitle>
            {showDescription && blockDescription && (
                <Description className="Block__Description">
                    <ReactMarkdown source={blockDescription} escapeHtml={false} />
                </Description>
            )}
        </>
    )
}

BlockTitle.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.node,
        titleId: PropTypes.string,
        description: PropTypes.node,
        descriptionId: PropTypes.string,
    }).isRequired,
    showDescription: PropTypes.bool.isRequired,
    isShareable: PropTypes.bool.isRequired,
}

BlockTitle.defaultProps = {
    showDescription: true,
    isShareable: true,
}

const StyledBlockTitle = styled.div`
    border-bottom: ${(props) => props.theme.separationBorder};
    padding-bottom: ${spacing(0.5)};
    margin-bottom: ${spacing(1)};
    display: flex;
    align-items: center;

    .Block__Title__Share {
        margin-left: ${spacing(0.5)};
    }

    &:hover {
        .SharePermalink {
            opacity: 1;
        }
    }
`

const BlockTitleText = styled.h3`
    margin-bottom: 0;

    @media ${mq.small} {
        opacity: 1;
        transition: all 300ms ease-in;
        flex: 1;

        .Block__Title--open & {
            opacity: 0.2;
        }
    }
`

const LeftPart = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Description = styled.div`
    margin-bottom: ${spacing(1)};

    p {
        &:last-child {
            margin: 0;
        }
    }
`

const BlockChartControls = styled.div`
    display: flex;
    justify-content: flex-end;

    @media ${mq.small} {
        margin-left: ${spacing(0.5)};
    }

    .capture & {
        display: none;
    }
`

export default memo(BlockTitle)
