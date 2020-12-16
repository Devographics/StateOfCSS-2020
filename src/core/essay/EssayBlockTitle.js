import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import last from 'lodash/last'
import { mq, spacing } from 'core/theme'
import ShareBlock from 'core/share/ShareBlock'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from 'core/helpers/pageContext'
import { getBlockMeta } from 'core/helpers/blockHelpers'
import BlockCompletionIndicator from 'core/blocks/block/BlockCompletionIndicator'
import { getBlockTitleKey, getBlockDescriptionKey, getBlockTitle } from 'core/helpers/blockHelpers'
import T from 'core/i18n/T'

const BlockTitleContents = ({ block, context }) => {
    const { title, titleLink } = block
    if (title) {
        return titleLink ? <a href={titleLink}>{title}</a> : title
    } else {
        return <T k={getBlockTitleKey(block, context)} />
    }
}

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
    const { id, showDescription = true } = block
    const completion =
        data && (Array.isArray(data) ? last(data) && last(data).completion : data.completion)
    const [showOptions, setShowOptions] = useState(false)
    const context = usePageContext()
    const { translate } = useI18n()

    const blockTitle = getBlockTitle(block, context, translate)
    const blockMeta = getBlockMeta(block, context, translate)

    return (
        <>
            <StyledBlockTitle
                className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}
            >
                <LeftPart>
                    <BlockTitleText className="BlockTitleText">
                        <BlockTitleContents block={block} context={context} />
                        {/* {completion && !context.isCapturing && (
                            <BlockCompletionIndicator completion={completion} />
                        )} */}
                    </BlockTitleText>
                    {isShareable && !context.isCapturing && (
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
            </StyledBlockTitle>
        </>
    )
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
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

export default memo(BlockTitle)
