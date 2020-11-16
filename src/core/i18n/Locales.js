import React from 'react'
import styled from 'styled-components'
import { usePageContext } from 'core/helpers/pageContext'
import { Link } from 'gatsby'
import { mq, spacing, fontSize, fontWeight } from 'core/theme'

const Container = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: ${spacing()};
    grid-row-gap: ${spacing()};
`

const Item = styled(Link)`
    text-align: center;
    font-size: ${fontSize('medium')};
    
    @media ${mq.smallMedium} {
        font-size: ${fontSize('small')};    
    }
    @media ${mq.large} {
        font-size: ${fontSize('medium')};
    }
    
    &._is-current {
        font-weight: ${fontWeight('bold')};
    }
}
`

const Locales = () => {
    const context = usePageContext()
    const links = context.locales.map((locale) => {
        return {
            ...locale,
            link: `${locale.path === 'default' ? '' : `/${locale.path}`}${context.basePath}`,
            isCurrent: locale.locale === context.locale,
        }
    })

    return (
        <Container className="Locales">
            {links.map(({ label, id, link, isCurrent }) => (
                <Item
                    key={id}
                    className={`Locales__Item${isCurrent ? ' _is-current' : ''}`}
                    to={link}
                >
                    {label}
                </Item>
            ))}
        </Container>
    )
}

export default Locales
