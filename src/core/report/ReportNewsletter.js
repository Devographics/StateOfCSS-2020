import React from 'react'
import styled from 'styled-components'
import Newsletter from 'core/components/Newsletter'
import { spacing } from 'core/theme'

const NewsletterBlock = ({ title, description }) => {
    return (
        <Container>
            <Heading>{title}</Heading>
            <Description>{description}</Description>
            <Newsletter />
        </Container>
    )
}

const Container = styled.div`
    padding: ${spacing(2)};
    margin: ${spacing(3)} 0;
    border: ${(props) => props.theme.separationBorder};
`

const Heading = styled.h3`
    margin-bottom: ${spacing(0.75)};
    font-size: ${(props) => props.theme.typography.size.larger};
`

const Description = styled.div`
    margin-bottom: ${spacing(1.5)};
`

export default NewsletterBlock
