import React from 'react'
import styled from 'styled-components'
import { color, mq, spacing } from 'core/theme'
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
    p:last-child {
        margin: 0;
    }
`

export default ReportNote
