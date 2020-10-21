import React from 'react'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'
import { mq, spacing, fontSize } from 'core/theme'
import { usePageContext } from 'core/helpers/pageContext'
import { useI18n } from 'core/i18n/i18nContext'
import Link from 'core/components/LocaleLink'
import Button from 'core/components/Button'
import PageLabel from './PageLabel'

const PageFooter = () => {
    const context = usePageContext()
    const { translate } = useI18n()

    return (
        <Container className="PageFooter">
            <Nav className="PageFooter__Nav">
                {context.previous && !isEmpty(context.previous) && (
                    <PreviousLink
                        as={Link}
                        className="PageFooter__Link PageFooter__Link--previous"
                        to={`${context.localePath}${context.previous.path}`}
                    >
                        « {translate('general.previous')} <PageLabel page={context.previous} />
                    </PreviousLink>
                )}
                {context.next && !isEmpty(context.next) && (
                    <NextLink
                        as={Link}
                        className="PageFooter__Link PageFooter__Link--next Button"
                        to={`${context.localePath}${context.next.path}`}
                    >
                        {translate('general.next')} <PageLabel page={context.next} /> »
                    </NextLink>
                )}
            </Nav>
            <Notes>
                <span
                    dangerouslySetInnerHTML={{
                        __html: translate('footer.state_of_js_link', {
                            values: { link: 'http://stateofjs.com/' },
                        }),
                    }}
                />{' '}
                <span
                    dangerouslySetInnerHTML={{
                        __html: translate('footer.leave_an_issue', {
                            values: {
                                link: 'https://github.com/StateOfJS/State-of-JS-2019/issues',
                            },
                        }),
                    }}
                />{' '}
                <span
                    dangerouslySetInnerHTML={{
                        __html: translate('footer.netlify', {
                            values: { link: 'https://www.netlify.com' },
                        }),
                    }}
                />
            </Notes>
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
    @media ${mq.mediumLarge} {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Notes = styled.div`
    font-size: ${fontSize('smaller')};
    text-align: center;

    @media ${mq.small} {
        margin-top: ${spacing(4)};
    }
    @media ${mq.mediumLarge} {
        margin-top: ${spacing(6)};
    }
`

const FooterLink = styled(Button)`
    @media ${mq.small} {
        display: block;
        text-align: center;
    }
`

const PreviousLink = styled(FooterLink)`
    @media ${mq.small} {
        margin-bottom: ${spacing()};
    }
    @media ${mq.mediumLarge} {
        margin-right: ${spacing()};
    }

    &,
    &:link,
    &:visited {
        color: ${({ theme }) => theme.colors.link};
    }

    &,
    &:hover {
        background: ${({ theme }) => theme.colors.background};
        border-color: ${({ theme }) => theme.colors.background};
    }

    &:hover {
        color: ${({ theme }) => theme.colors.contrast};
        text-decoration: underline;
    }
`

const NextLink = styled(FooterLink)``

export default PageFooter
