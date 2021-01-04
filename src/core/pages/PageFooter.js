import React from 'react'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'
import { mq, spacing, fontSize } from 'core/theme'
import { usePageContext } from 'core/helpers/pageContext'
import Link from 'core/components/LocaleLink'
import Button from 'core/components/Button'
import PageLabel from './PageLabel'
import T from 'core/i18n/T'
import Footer from 'core/components/Footer'

const PageFooter = () => {
    const context = usePageContext()

    return (
        <Container>
            <Nav>
                {context.previous && !isEmpty(context.previous) && (
                    <PreviousLink
                        as={Link}
                        className="PageFooter__Link PageFooter__Link--previous"
                        to={context.previous.path}
                    >
                        «{' '}
                        <LinkLabel>
                            <T k="page.previous" />
                        </LinkLabel>{' '}
                        <PageLabel page={context.previous} />
                    </PreviousLink>
                )}
                {context.next && !isEmpty(context.next) && (
                    <NextLink
                        as={Link}
                        className="PageFooter__Link PageFooter__Link--next Button"
                        to={context.next.path}
                    >
                        <LinkLabel>
                            <T k="page.next" />
                        </LinkLabel>{' '}
                        <PageLabel page={context.next} /> »
                    </NextLink>
                )}
            </Nav>
            <Footer/>
        </Container>
    )
}

const Container = styled.div`
    @media ${mq.small} {
        margin-top: ${spacing(4)};
    }
    @media ${mq.mediumLarge} {
        margin-top: ${spacing(6)};
    }
`

const Nav = styled.div`
    @media ${mq.small} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: ${spacing()};
    }
    @media ${mq.mediumLarge} {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const FooterLink = styled(Button)`
    @media ${mq.small} {
        display: block;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
    }
`

const PreviousLink = styled(FooterLink)`
    @media ${mq.mediumLarge} {
        margin-right: ${spacing()};
    }
`

const NextLink = styled(FooterLink)``

const LinkLabel = styled.span`
    @media ${mq.small} {
        display: none;
    }
`

export default PageFooter
