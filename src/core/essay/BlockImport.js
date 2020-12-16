import React from 'react'
import BlockSwitcher from 'core/blocks/block/BlockSwitcher'
import { usePageContext } from 'core/helpers/pageContext'
import allBlocks from 'config/blocks.yml'

const BlockImport = ({ id }) => {
    const pageContext = usePageContext()
    const block = allBlocks.find((b) => b.id === id && b.lookBack)
    return <BlockSwitcher pageData={pageContext.pageData} block={{...block, hidden: false}} />
}

export default BlockImport
