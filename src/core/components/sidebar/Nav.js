import React from 'react'
import styled from 'styled-components'
import sitemap from '../../../../config/sitemap.yml'
import { mq, dimensions, fancyLinkMixin } from 'core/theme'
import { usePageContext } from 'core/helpers/pageContext'
import PageLink from 'core/pages/PageLink'
import PageLabel from 'core/pages/PageLabel'
import LanguageSwitcher from 'core/i18n/LanguageSwitcher'

const filteredNav = sitemap.filter((page) => !page.is_hidden)

const StyledPageLink = styled(PageLink)`
    display: inline-block;
    white-space: nowrap;
    margin: 0 0 ${(props) => props.theme.spacing / 3}px 0;
    font-size: ${(props) =>
        props.depth > 0
            ? props.theme.typography.sizes.smallish
            : props.theme.typography.sizes.medium};
    font-weight: ${(props) => (props.depth === 0 ? 800 : 400)};

    @media ${mq.large} {
        display: ${(props) => (props.isHidden ? 'none' : 'block')};
        margin-left: ${(props) => (props.depth > 0 ? dimensions.spacing : 0)}px;
    }

    &._is-active {
        span span::before {
            content: '> ';
        }

        @media ${mq.smallMedium} {
            span span::after {
                content: ' <';
            }
        }
    }

    ${(props) =>
        fancyLinkMixin({
            color: props.depth === 0 ? props.theme.colors.link : props.theme.colors.text,
            activeColor: props.theme.colors.linkActive,
        })}
`

const NavItem = ({ page, currentPath, closeSidebar, isHidden = false, depth = 0 }) => {
    const isActive = currentPath.indexOf(page.path) !== -1
    const hasChildren = page.children && page.children.length > 0
    const displayChildren = hasChildren > 0 && isActive

    return (
        <>
            <StyledPageLink
                activeClassName="_is-active"
                onClick={closeSidebar}
                page={page}
                depth={depth}
                isHidden={isHidden}
            >
                <span>
                    <PageLabel page={page} />
                </span>
            </StyledPageLink>
            {hasChildren && (
                <>
                    {page.children.map((childPage) => (
                        <NavItem
                            key={childPage.id}
                            page={childPage}
                            closeSidebar={closeSidebar}
                            currentPath={currentPath}
                            depth={depth + 1}
                            isHidden={!displayChildren}
                        />
                    ))}
                </>
            )}
        </>
    )
}

export const Nav = ({ closeSidebar }) => {
    const context = usePageContext()

    return (
        <NavContainer>
            <LanguageSwitcher />
            {filteredNav.map((page, i) => (
                <NavItem
                    key={i}
                    page={page}
                    currentPath={context.currentPath}
                    closeSidebar={closeSidebar}
                />
            ))}
        </NavContainer>
    )
}

const NavContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: ${dimensions.spacing * 1.5}px ${dimensions.spacing}px;
    overflow-y: auto;

    @media ${mq.smallMedium} {
        align-items: center;
    }
`
