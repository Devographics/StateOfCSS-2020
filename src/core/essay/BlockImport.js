import React, { useState } from 'react'
import BlockSwitcher from 'core/blocks/block/BlockSwitcher'
import { usePageContext } from 'core/helpers/pageContext'
import allBlocks from 'config/blocks.yml'
import styled, { css } from 'styled-components'
import { mq, spacing, color } from 'core/theme'
import EssayBlockTitle from 'core/essay/EssayBlockTitle'

const BlockImport = ({ id, children, size = 's' }) => {
    const [triggerId, setTriggerId] = useState()
    const pageContext = usePageContext()
    const block = allBlocks.find((b) => b.id === id && b.isReport)

    if (!block) {
        return <div>Missing block {id}</div>
    }

    const newBlock = {
        ...block,
        hidden: false,
        showDescription: false,
        showNote: false,
        legendPosition: 'bottom',
        overrides: {
            BlockTitle: EssayBlockTitle,
        },
    }

    const childrenWithExtraProp = React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
            triggerId,
            setTriggerId,
            isFirst: index === 0,
            isLast: index === children.length - 1,
        })
    )

    const hasOverlays = typeof children !== 'undefined'

    return (
        <ChartWrapper className="ChartWrapper" size={size}>
            <ChartContents className="ChartContents" hasOverlays={hasOverlays} size={size}>
                <BlockSwitcher
                    pageData={pageContext.pageData}
                    block={newBlock}
                    triggerId={triggerId}
                />
            </ChartContents>
            <ChartOverlays className="ChartOverlays" size={size}>
                {childrenWithExtraProp}
            </ChartOverlays>
        </ChartWrapper>
    )
}

const ChartWrapper = styled.div`
    padding: ${spacing(2)} 0;
    ${({ size }) => {
        if (size === 's') {
            return css``
        } else if (size === 'm') {
            return css`
                width: 1100px;
                margin-left: calc(50% - 550px);
            `
        } else if (size === 'l') {
            return css`
                width: 100vw;
                margin-left: calc(50% - 50vw);
                padding: ${spacing(2)};
            `
        }
    }}
`

const ChartContents = styled.div`
    ${({ hasOverlays }) =>
        hasOverlays &&
        css`
            position: sticky;
            top: 0;
            height: 100vh;
            padding: ${spacing(2)} 0;
        `}
`

const ChartOverlays = styled.div`
    pointer-events: none;
`

export default BlockImport
