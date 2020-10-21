import { createGlobalStyle } from 'styled-components'
import { color, spacing, fontWeight } from './util'
import { primaryFontMixin, secondaryFontMixin } from './typography'
import mq from './mq'

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${color('background')};
        color: ${color('text')};
        padding: 0;
        font-feature-settings: 'liga' 0;
        line-height: 1.7;
        ${primaryFontMixin};
        
        @media ${mq.small} {
            font-size: ${(props) => props.theme.typography.rootSize.mobile};
        }
        
        @media ${mq.large} {
            font-size: ${(props) => props.theme.typography.rootSize.desktop};
            min-height: 100vh;
        }
    }
    
    html {
        box-sizing: border-box;
    }
    
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        ${secondaryFontMixin}
        margin: 0 0 ${spacing()} 0;
    }
    
    a {
        text-decoration: none;
        font-weight: ${fontWeight('bold')};
        
        &,
        &:link,
        &:visited,
        &:active,
        &:focus {
            color: ${color('link')};
        }
        
        &:hover {
            text-decoration: underline;
            color: ${color('linkHover')};
        }
    }
    
    p,
    ul,
    ol {
        margin: 0 0 ${spacing()} 0;
        
        @media ${mq.small} {
            line-height: 1.6;
        }
        
        @media ${mq.mediumLarge} {
            line-height: 1.8;
        }
    }
    
    pre,
    code {
        ${secondaryFontMixin}
    }
    
    .desktop {
        @media ${mq.small} {
            display: none;
        }
    }
    
    .mobile {
        @media ${mq.mediumLarge} {
            display: none;
        }
    }
    
    iframe {
        display: none;
    }
    
    .ReactModal__Overlay {
        z-index: 1000;
    }
    
    .Page--awards {
        @media ${mq.mediumLarge} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: ${spacing(4)};
            row-gap: ${spacing(4)};
            
            .Page__Introduction {
                grid-column: 1 / 3;
            }
        }
    }
`
