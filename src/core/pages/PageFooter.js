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
        <Container>
            <Nav>
                {context.previous && !isEmpty(context.previous) && (
                    <PreviousLink
                        as={Link}
                        className="PageFooter__Link PageFooter__Link--previous"
                        to={context.previous.path}
                    >
                        « {translate('page.previous')} <PageLabel page={context.previous} />
                    </PreviousLink>
                )}
                {context.next && !isEmpty(context.next) && (
                    <NextLink
                        as={Link}
                        className="PageFooter__Link PageFooter__Link--next Button"
                        to={context.next.path}
                    >
                        {translate('page.next')} <PageLabel page={context.next} /> »
                    </NextLink>
                )}
            </Nav>
            <Notes>
                <span
                    dangerouslySetInnerHTML={{
                        __html: translate('general.leave_issue', {
                            values: {
                                link: 'https://github.com/StateOfJS/StateOfCSS-2020',
                            },
                        }),
                    }}
                />{' '}
                <span
                    dangerouslySetInnerHTML={{
                        __html: translate('general.netlify_link', {
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
`

const NextLink = styled(FooterLink)``

export default PageFooter
