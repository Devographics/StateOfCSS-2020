import React from 'react'
import EssayContents from 'config/essay.mdx'
import styled from 'styled-components'
import { mq, color, spacing, fontSize, fontWeight } from 'core/theme'
import Logo from 'core/components/Logo'

export default () => (
    <Essay className="Essay">
        <Logo size="l" />
        <EssayContents />
    </Essay>
)

const Essay = styled.div`
    p{
        font-size: ${fontSize('large')};
    }
    code {
        background: ${color('backgroundAlt')};
        padding: 3px 6px;
        font-weight: ${fontWeight('medium')};
        color: ${color('contrast')};
        border: 1px dotted ${color('contrast')};
        font-size: ${fontSize('smallish')};
    }
`
