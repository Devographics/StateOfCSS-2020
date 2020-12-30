import React from 'react'
import styled from 'styled-components'
import { mq, spacing } from 'core/theme'
import authors from 'config/authors.yml'
import ReactMarkdown from 'react-markdown/with-html'

const Credits = ({ title, bios }) => {
    return (
        <Container>
            <div className="Block About">
                <Heading className="Block__Heading About__Heading">{title}</Heading>
                <Authors className="About__Authors">
                    {authors.map(({ name, slug, url }) => (
                        <Author key={slug} className="About__Author">
                            <Name className="About__Author__Name">
                                <a href={url}>{name}</a>
                            </Name>
                            <Bio className="About__Author__Bio">
                                <ReactMarkdown
                                    source={bios.find((b) => b.slug === slug).contents}
                                />
                            </Bio>
                        </Author>
                    ))}
                </Authors>
            </div>
        </Container>
    )
}

const Container = styled.div`
    margin: ${spacing(3)} 0;
`

const Heading = styled.h3`
    margin-bottom: ${spacing(0.75)};
    font-size: ${(props) => props.theme.typography.size.larger};
    text-align: center;
`

const Authors = styled.div`
    @media ${mq.small} {
    }
    @media ${mq.mediumLarge} {
        display: grid;
        column-gap: ${spacing(4)};
        grid-template-columns: 1fr 1fr;
    }
`

const Author = styled.div``

const Name = styled.h4`
    margin-bottom: ${spacing(0.5)};
`

const Bio = styled.div`
    margin-bottom: ${spacing(1.5)};
`

export default Credits
