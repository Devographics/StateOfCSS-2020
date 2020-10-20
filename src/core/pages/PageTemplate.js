import React from 'react'
import TextBlock from 'core/blocks/other/TextBlock'
import PageHeader from 'core/pages/PageHeader'
import PageFooter from 'core/pages/PageFooter'
import { usePageContext } from 'core/helpers/pageContext'
import BlockSwitcher from 'core/blocks/block/BlockSwitcher'

const PageTemplate = ({ data = {}, pageContext = {} }) => {
    const context = usePageContext()
    const { pageData, showTitle = true, id, is_hidden = false } = pageContext

    return (
        <>
            {showTitle && <PageHeader />}
            {data.introduction && <TextBlock text={data.introduction.html} />}
            <main className={`Page--${id}`}>
                {context.blocks &&
                    context.blocks.map((block, i) => (
                        <BlockSwitcher key={block.id} block={block} pageData={pageData} index={i} />
                    ))}
            </main>
            {!is_hidden && <PageFooter />}
        </>
    )
}

export default PageTemplate
