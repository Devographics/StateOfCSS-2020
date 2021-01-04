import React from 'react'
import styled from 'styled-components'
import { color, mq, fontSize, spacing } from 'core/theme'
import ReactMarkdown from 'react-markdown/with-html'

const ReportNote = ({ children }) => {
    return (
        <Note>
            <ReactMarkdown source={children} />
        </Note>
    )
}

const Note = styled.div`
    background: ${color('backgroundAlt')};
    padding: ${spacing(1.5)};
    font-size: ${fontSize('medium')};
    p:last-child {
        margin: 0;
    }
`

export default ReportNote
