import React from 'react'
import styled, { css } from 'styled-components'
import { mq, spacing, color, fontWeight, fontSize } from 'core/theme'
import colors from 'core/theme/colors'
import {
    getDimension,
    getAnimationDelay,
    appear,
    pop,
    anim,
    slideright,
    slidetop,
} from './logoHelpers'
import { Triangle, Blobs, Circle, Frame, Stripes, Tildes } from './LogoElements'

const Logo = ({ className, animated = true, showText = true, report = false, size = 'l' }) => {
    const s = 0.8
    const offset = 96
    const offset2 = Math.round(96 * s)
    const triggerAnimation = true

    const properties = { s, offset: offset2, animated, triggerAnimation }

    return (
        <LogoContainer
            aria-hidden="true"
            className={`Logo__Container Logo--${size} ${className || ''}`}
            {...properties}
        >
            <LogoElement className={`Logo ${animated ? 'Logo--animated' : ''}`} {...properties}>
                <SVGFilter {...properties} />
                <Triangle delay={2800} {...properties} top={180} left={offset - 80} />
                <Blobs delay={900} {...properties} top={120} left={100} />
                {size !== 's' && <Stripes delay={1400} {...properties} top={248} left={96} />}
                <Circle delay={500} {...properties} left={10} />

                <Frame delay={800} {...properties} right={offset - 8} />
                {size !== 's' && (
                    <Tildes delay={1900} {...properties} top={80} right={offset - 56} />
                )}
                {showText && (
                    <StateOf delay={2200} className="text stateof" {...properties}>
                        State Of
                    </StateOf>
                )}
                <C delay={100} className="letter c" {...properties}>
                    <div>C</div>
                </C>
                <S1 delay={100} className="letter s1" {...properties}>
                    <div>S</div>
                </S1>
                <S2 delay={100} className="letter s2" {...properties}>
                    <div>S</div>
                </S2>
                {showText && (
                    <Year delay={2500} className="text year" {...properties}>
                        2020
                    </Year>
                )}
                {report && (
                    <Report
                        delay={2800}
                        className="text report"
                        {...properties}
                        top={80}
                        right={offset - 56}
                    >
                        <div className="R1">R</div>
                        <div className="R2">E</div>
                        <div className="R3">P</div>
                        <div className="R4">O</div>
                        <div className="R5">R</div>
                        <div className="R6">T</div>
                    </Report>
                )}
            </LogoElement>
        </LogoContainer>
    )
}

const LogoContainer = styled.div`
    /* overflow: hidden; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${spacing(2)};
    @media ${mq.medium} {
        transform: scale(0.9);
    }
    @media ${mq.small} {
        transform: scale(0.6);
        margin: -${spacing(2)} 0;
    }
    @media ${mq.xSmall} {
        transform: scale(0.4);
        margin: -${spacing(4)} 0;
    }
`

const LogoElement = styled.div`
    text-shadow: none;
    flex: 0 0 ${getDimension(800)};
    width: ${getDimension(800)};
    height: ${getDimension(400)};
    position: relative;
    & > * {
        position: absolute;
    }
`

const Text = styled.div`
    font-size: ${getDimension(48)};
    font-style: italic;
    color: ${color('border')};
`

const StateOf = styled(Text)`
    top: 0px;
    left: 0px;
    ${anim(
        appear,
        300,
        css`
            opacity: 0;
        `
    )}
    ${getAnimationDelay()}
`

const Year = styled(Text)`
    bottom: 0px;
    right: 0px;
    text-align: right;
    ${anim(
        appear,
        300,
        css`
            opacity: 0;
        `
    )}
    ${getAnimationDelay()}
`

const Letter = styled.div`
    font-size: ${getDimension(288)};
    color: ${color('link')};
    font-weight: ${fontWeight('bold')};
    line-height: 1;
    div {
        ${anim(
            pop,
            300,
            css`
                opacity: 0;
                transform: scale(0);
            `
        )}
    }
`

const C = styled(Letter)`
    top: 50%;
    transform: translateY(-50%);
    left: ${({ offset }) => offset}px;
    text-shadow: ${getDimension(10)} ${getDimension(10)} 0px ${colors.blue};
    div {
        ${getAnimationDelay()}
    }
`

const S1 = styled(Letter)`
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    div {
        ${getAnimationDelay(100)}
    }
`

const S2 = styled(Letter)`
    top: 50%;
    transform: translateY(-50%);
    right: ${({ offset }) => offset}px;
    div {
        text-align: right;
        background: ${({ s }) =>
            `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 ${
                50 * s
            } ${50 * s}" xml:space="preserve" height="${10 * s}px" width="${
                10 * s
            }px"><g ><circle r="${15 * s}" cx="${15 * s}" cy="${
                15 * s
            }" fill="%23EC2F95"/></g></svg>')`};
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        ${getAnimationDelay(200)}
    }
`

// const Report = styled.div`
//     bottom: ${getDimension(50)};
//     right: ${getDimension(-10)};
//     display: flex;
//     font-weight: ${fontWeight('bold')};
//     /* background: ${colors.pink}; */
//     font-size: ${getDimension(56)};
//     color: ${colors.pink};
//     transform: rotate(-45deg);
//     letter-spacing: 5px;
// `

const Report = styled.div`
    bottom: ${getDimension(140)};
    right: ${getDimension(0)};
    display: flex;
    font-weight: ${fontWeight('bold')};
    background: ${colors.pink};
    font-size: ${getDimension(40)};
    color: ${color('background')};
    letter-spacing: 5px;
    line-height: 1;
    padding: 5px 10px;
    ${anim(
        slideright,
        300,
        css`
            opacity: 0;
            transform: translateX(${getDimension(-40)});
        `
    )}
    ${getAnimationDelay()}

    div {
        ${anim(
            slidetop,
            300,
            css`
                transform: scale(0) translateY(${getDimension(-200)}) rotate(180deg);
            `
        )}
    }
    .R1 {
        ${getAnimationDelay(300)}
    }
    .R2 {
        ${getAnimationDelay(400)}
    }
    .R3 {
        ${getAnimationDelay(500)}
    }
    .R4 {
        ${getAnimationDelay(600)}
    }
    .R5 {
        ${getAnimationDelay(700)}
    }
    .R6 {
        ${getAnimationDelay(800)}
    }
`

export const SVGFilter = () => (
    <svg xmlns="http://www.w3.org/2000/svg">
        {/* see https://css-tricks.com/gooey-effect/ */}
        <defs>
            <filter id="blob">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                    in="blur"
                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                    result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>
)

export default Logo
