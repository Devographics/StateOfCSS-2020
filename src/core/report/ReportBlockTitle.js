import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { fontSize, mq, spacing } from 'core/theme'
import ShareBlock from 'core/share/ShareBlock'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from 'core/helpers/pageContext'
import blocks from 'config/blocks.yml'
import colors from 'core/theme/colors'

const BlockTitle = (props) => {
    const { isShareable, values, block, current } = props
    const [showOptions, setShowOptions] = useState(false)
    const context = usePageContext()
    const { translate } = useI18n()

    let blockTitle
    if (typeof block.title === 'function') {
        blockTitle = block.title({ ...props, translate })
    } else {
        blockTitle = block.title
    }

    // the original block doesn't have `_abridged` so we need to remove it to find it
    const originalBlockDefinition = blocks.find((b) => b.id === block.id.replace('_abridged', '') && !b.isReport)
    const linkOverride =
        originalBlockDefinition &&
        `${context.host}${context.locale.path}${originalBlockDefinition.path}?report`

    return (
        <>
            <StyledBlockTitle
                className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}
            >
                <LeftPart>
                    <BlockTitleText className="BlockTitleText">
                        {blockTitle}
                    </BlockTitleText>
                    {isShareable && !context.isCapturing && (
                        <ShareBlock
                            block={block}
                            className="Block__Title__Share"
                            values={values}
                            title={blockTitle}
                            linkOverride={linkOverride}
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
    margin-bottom: ${spacing(1)};
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
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
    text-shadow: 3px 3px 0px ${colors.blue};

    @media ${mq.small} {
        opacity: 1;
        transition: all 300ms ease-in;
        flex: 1;

        .Block__Title--open & {
            opacity: 0.2;
        }
    }
    @media ${mq.mediumLarge} {
        font-size: 1.3rem;
    }
`

const LeftPart = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

export default memo(BlockTitle)
