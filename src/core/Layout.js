import React, { PureComponent, useCallback, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import '../stylesheets/screen.scss'
import Pagination from './pages/Pagination'
import { Sidebar } from './components/sidebar'
import Head from './components/Head'
import { PageContextProvider } from './helpers/pageContext'
import { mergePageContext } from './helpers/pageHelpers'
import { I18nContextProvider } from './i18n/i18nContext'
import { ToolsContextProvider } from './helpers/toolsContext'
import { EntitiesContextProvider } from './entities/entitiesContext'
import PageMetaDebug from './pages/PageMetaDebug'
import themes from './theme/themes'
import { mq, dimensions } from './theme'

const themeIds = ['js', 'css', 'test']

const ThemedLayout = ({
    context,
    showPagination,
    showSidebar,
    toggleSidebar,
    closeSidebar,
    props,
}) => {
    const [themeId, setThemeId] = useState('css')

    const switchTheme = useCallback(
        (event) => {
            if (event.code === 'KeyX') {
                setThemeId((current) => {
                    const currentIndex = themeIds.findIndex((id) => id === current)
                    if (currentIndex < themeIds.length - 1) {
                        return themeIds[currentIndex + 1]
                    }

                    return themeIds[0]
                })
            }
        },
        [setThemeId]
    )

    useEffect(() => {
        document.addEventListener('keypress', switchTheme)

        return () => {
            document.removeEventListener('keypress', switchTheme)
        }
    }, [switchTheme])

    return (
        <ThemeProvider theme={themes[themeId]}>
            <ToolsContextProvider>
                <EntitiesContextProvider>
                    <GlobalStyle />
                    <div
                        className={classNames('pageLayout', `PageLayout--${context.id}`, {
                            'PageLayout--sidebar': showSidebar,
                            'PageLayout--nosidebar': !showSidebar,
                            capture: context.isCapturing,
                            nocapture: !context.isCapturing,
                        })}
                    >
                        <Head />
                        <InnerPageLayout>
                            <div>
                                <Sidebar
                                    {...props}
                                    showSidebar={showSidebar}
                                    closeSidebar={closeSidebar}
                                />
                            </div>
                            <PageContent>
                                {showPagination && (
                                    <Pagination toggleSidebar={toggleSidebar} position="top" />
                                )}
                                <PageMain>
                                    <PageMetaDebug />
                                    {props.children}
                                </PageMain>
                            </PageContent>
                        </InnerPageLayout>
                    </div>
                </EntitiesContextProvider>
            </ToolsContextProvider>
        </ThemeProvider>
    )
}

const InnerPageLayout = styled.div`
    min-height: 100vh;

    @media ${mq.large} {
        display: grid;
        grid-template-columns: ${dimensions.sidebar.width}px 1fr;
    }
`

const PageContent = styled.main`
    display: flex;
    flex-direction: column;
`

const PageMain = styled.main`
    overflow-x: hidden;
    flex-grow: 1;

    @media ${mq.smallMedium} {
        padding: ${dimensions.spacing}px;
    }

    @media ${mq.large} {
        padding: ${dimensions.spacing * 3}px;
    }
`

export default class Layout extends PureComponent {
    static propTypes = {
        showPagination: propTypes.bool.isRequired,
    }

    static defaultProps = {
        showPagination: true,
    }

    constructor() {
        super()
        this.state = {
            showSidebar: false,
        }
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    toggleSidebar = () => {
        this.setState({
            showSidebar: !this.state.showSidebar,
        })
    }

    closeSidebar = () => {
        this.setState({
            showSidebar: false,
        })
    }

    render() {
        const { showPagination, location, pageContext } = this.props
        const { showSidebar } = this.state
        const context = mergePageContext(pageContext, location, this.state)

        return (
            <PageContextProvider value={context}>
                <I18nContextProvider>
                    <ThemedLayout
                        context={context}
                        showPagination={showPagination}
                        showSidebar={showSidebar}
                        toggleSidebar={this.toggleSidebar}
                        closeSidebar={this.closeSidebar}
                        props={this.props}
                    />
                </I18nContextProvider>
            </PageContextProvider>
        )
    }
}

const GlobalStyle = createGlobalStyle`
    body {
        background: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
        padding: 0;
        font-feature-settings: 'liga' 0;
        line-height: 1.7;
    }
    
    html {
        box-sizing: border-box;
    }
    
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    
    a {
        text-decoration: none;
        
        &,
        &:link,
        &:visited,
        &:active,
        &:focus {
            color: ${(props) => props.theme.colors.link};
        }
        
        &:hover {
            text-decoration: underline;
            color: ${(props) => props.theme.colors.linkHover};
        }
    }
    
    .ReactModal__Overlay {
        z-index: 1000;
    }
    
    .Page__Contents--awards {
        @media ${mq.mediumLarge} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: ${(props) => props.theme.spacing * 4}px;
            row-gap: ${(props) => props.theme.spacing * 4}px;
            
            .Page__Introduction {
                grid-column: 1 / 3;
            }
        }
    }
`
