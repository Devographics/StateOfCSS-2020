import { css } from 'styled-components'

export const typography = {
    rootSize: {
        mobile: '13px',
        desktop: '17px',
    },
    size: {
        smaller: '0.7rem',
        small: '0.8rem',
        smallish: '0.9rem',
        medium: '1rem',
        large: '1.1rem',
        larger: '1.3rem',
        largest: '2rem',
    },
    weight: {
        light: 300,
        medium: 400,
        bold: 800,
    },
}

export const primaryFontMixin = css`
    font-family: 'IBM Plex Mono', monospace;
    font-weight: ${typography.weight.medium};
`

export const secondaryFontMixin = css`
    font-family: 'IBM Plex Mono', monospace;
    font-weight: ${typography.weight.bold};
`

/*
@mixin font-light {
    font-weight: $light;
}

@mixin font-regular {
    font-weight: $medium;
}

@mixin font-bold {
    font-weight: $bold;
}

strong {
    font-weight: $bold;
}

.first-letter {
    float: left;
    display: block;
    font-size: 7rem;
    margin-right: $spacing;
    line-height: 1;
}
 */
