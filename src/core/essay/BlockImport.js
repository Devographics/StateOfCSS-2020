import React, { useState } from 'react'
import BlockSwitcher from 'core/blocks/block/BlockSwitcher'
import { usePageContext } from 'core/helpers/pageContext'
import allBlocks from 'config/blocks.yml'
import styled, { css } from 'styled-components'
import { mq, spacing, color } from 'core/theme'
import EssayBlockTitle from 'core/essay/EssayBlockTitle'

const NoSwitcher = () => null

const BlockImport = ({ id, children }) => {
    const [triggerId, setTriggerId] = useState()
    const pageContext = usePageContext()
    const block = allBlocks.find((b) => b.id === id && b.lookBack)

    const newBlock = {
        ...block,
        hidden: false,
        showDescription: false,
        showNote: false,
        overrides: {
            BlockTitle: EssayBlockTitle,
        },
    }

    const childrenWithExtraProp = React.Children.map(children, (child) =>
        React.cloneElement(child, { triggerId, setTriggerId })
    )

    const hasOverlays = Array.isArray(children)

    return (
        <ChartWrapper className="ChartWrapper">
            <ChartContents className="ChartContents" hasOverlays={hasOverlays}>
                <BlockSwitcher
                    pageData={pageContext.pageData}
                    block={newBlock}
                    triggerId={triggerId}
                />
            </ChartContents>
            <ChartOverlays className="ChartOverlays">{childrenWithExtraProp}</ChartOverlays>
        </ChartWrapper>
    )
}

const ChartWrapper = styled.div`
    padding: ${spacing(2)} 0;
`

const ChartContents = styled.div`
    ${({ hasOverlays }) => hasOverlays && css`
        position: sticky;
        top: 0;
        height: 100vh;
        padding: ${spacing(2)} 0;
    `}
`

const ChartOverlays = styled.div``

export default BlockImport
