import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { mq, spacing, color, fontWeight } from 'core/theme'
import colors from 'core/theme/colors'

const appear = keyframes`
    to {
        opacity: 1;
    }
`

const pop = keyframes`
    0% {
        opacity: 0;
        transform: scale(0);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`

const popspin = keyframes`
    0% {
        transform: scale(0) rotate(0);
    }
    50% {
        transform: scale(1.2) rotate(800deg);
    }
    100% {
        transform: scale(1) rotate(720deg);
    }
`

const slideleft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(40px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
`
const slideright = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-40px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
`

const slidetop = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-200px) rotate(180deg);
    }
    100% {
        opacity: 1;
        transform: translateY(0px) rotate(0deg);
    }
`
const blob = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    20% {
        opacity: 1;
    }
    80% {
        opacity: 1;
        transform: translateX(-20px);
    }
    100% {
        opacity: 1;
        transform: translateX(-40px);
    }
`

const getOffset = () => ({ offset = 1 }) => `${offset}px`
const getDimension = (d) => ({ s = 1 }) => `${d * s}px`

/*

Use either default delay defined in styled components or override it with
`delay` prop

*/
const getAnimationDelay = (defaultDelay = 0, offsetDelay = 0) => ({ delay }) =>
    css`
        animation-delay: ${(delay || defaultDelay) + offsetDelay}ms;
    `

const anim = (animation, duration, contents) => ({ animated }) =>
    animated &&
    css`
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-name: ${animation};
        animation-duration: ${duration}ms;
        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        ${contents}
    `

const Logo = ({ className, animated = true, showText = true, size = 'l' }) => {
    const s = 0.8
    const offset = Math.round(96 * s)

    const properties = { s, offset, animated }

    return (
        <LogoContainer
            aria-hidden="true"
            className={`Logo__Container Logo--${size} ${className || ''}`}
            {...properties}
        >
            <LogoElement className={`Logo ${animated ? 'Logo--animated' : ''}`} {...properties}>
                <SVGFilter {...properties} />
                <Triangle {...properties} />
                <Blobs {...properties} />
                {size !== 's' && <Stripes {...properties} />}
                <Circle {...properties} />

                <Frame {...properties} />
                {size !== 's' && <Tildes {...properties} />}
                {showText && (
                    <StateOf className="text stateof" {...properties}>
                        State Of
                    </StateOf>
                )}
                <C className="letter c" {...properties}>
                    <div>C</div>
                </C>
                <S1 className="letter s1" {...properties}>
                    <div>S</div>
                </S1>
                <S2 className="letter s2" {...properties}>
                    <div>S</div>
                </S2>
                {showText && (
                    <Year className="text year" {...properties}>
                        2020
                    </Year>
                )}
            </LogoElement>
        </LogoContainer>
    )
}

const LogoContainer = styled.div`
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${spacing(2)};
`

const LogoElement = styled.div`
    text-shadow: none;
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
    ${getAnimationDelay(2200)}
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
    ${getAnimationDelay(2500)}
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
        ${getAnimationDelay(100)}
    }
`

const S1 = styled(Letter)`
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    div {
        ${getAnimationDelay(100, 100)}
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
        ${getAnimationDelay(100, 200)}
    }
`

export const Triangle = (properties) => (
    <TriangleSC className="triangle" {...properties}>
        <div className="inner" />
    </TriangleSC>
)

const TriangleSC = styled.div`
    width: ${getDimension(144)};
    top: ${getDimension(180)};
    left: ${getOffset()} - ${getDimension(80)};
    ${anim(
        popspin,
        600,
        css`
            transform: scale(0);
        `
    )}
    ${getAnimationDelay(2800)}
    .inner {
        width: 100%;
        border: ${getDimension(100)} solid transparent;
        border-bottom-color: ${colors.blue};
        border-width: 0 ${getDimension(72)} ${getDimension(100)} ${getDimension(72)};
    }
`

export const Blobs = (properties) => (
    <BlobsSC className="blobs" {...properties}>
        <Blob1 className="blob blob1" {...properties} />
        <Blob2 className="blob blob2" {...properties} />
    </BlobsSC>
)

const BlobsSC = styled.div`
    filter: url('#blob');
    left: ${getDimension(100)};
    top: ${getDimension(120)};
    transform: rotate(-20deg);
    width: ${getDimension(400)};
    height: ${getDimension(200)};
    display: flex;
    align-items: center;
    justify-content: center;
`

const Blob = styled.div`
    width: 50%;
    height: 100%;
    background: ${color('border')};
    border-radius: 50%;
`

const Blob1 = styled(Blob)`
    ${anim(
        pop,
        300,
        css`
            opacity: 0;
            transform: scale(0);
        `
    )}
    ${getAnimationDelay(900)}
`

const Blob2 = styled(Blob)`
    transform: translateX(${getDimension(-40)});
    ${anim(
        blob,
        300,
        css`
            opacity: 0;
            transform: translateX(-100%);
        `
    )}
    ${getAnimationDelay(900)}
`

export const Stripes = (properties) => (
    <StripesSC className="stripes" {...properties}>
        <Stripe1 className="stripe stripe1" {...properties} />
        <Stripe2 className="stripe stripe2" {...properties} />
        <Stripe3 className="stripe stripe3" {...properties} />
        <Stripe4 className="stripe stripe4" {...properties} />
    </StripesSC>
)

const StripesSC = styled.div`
    position: absolute;
    top: ${getDimension(248)};
    left: ${getDimension(96)};
`

const Stripe = styled.div`
    height: ${getDimension(5)};
    width: ${getDimension(100)};
    background: ${color('border')};
    position: absolute;
    ${anim(
        slideleft,
        400,
        css`
            opacity: 0;
            transform: translateX(${getDimension(40)});
        `
    )}
`

const Stripe1 = styled(Stripe)`
    top: 0;
    left: 0;
    ${getAnimationDelay(1400)}
`
const Stripe2 = styled(Stripe)`
    top: ${getDimension(20)};
    left: ${getDimension(-8)};
    ${getAnimationDelay(1400, 100)}
`
const Stripe3 = styled(Stripe)`
    top: ${getDimension(40)};
    left: ${getDimension(-16)};
    ${getAnimationDelay(1400, 200)}
`
const Stripe4 = styled(Stripe)`
    top: ${getDimension(60)};
    left: ${getDimension(-8)};
    ${getAnimationDelay(1400, 300)}
`

export const Circle = (properties) => (
    <CircleSC className="circle" {...properties}>
        <div className="inner">
            <div />
        </div>
    </CircleSC>
)

const CircleSC = styled.div`
    width: ${getDimension(256)};
    top: 50%;
    left: calc(50% - ${getDimension(10)});
    .inner {
        transform: translateX(-50%) translateY(-50%);
        div {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            border: ${getDimension(10)} dashed ${colors.blue};
            border-radius: 100%;
            box-sizing: content-box;
            ${anim(
                popspin,
                600,
                css`
                    transform: scale(0);
                `
            )}
            ${getAnimationDelay(500)}
        }
    }
`

export const Frame = (properties) => (
    <FrameSC className="frame" {...properties}>
        <div className="inner">
            <div />
        </div>
    </FrameSC>
)

const FrameSC = styled.div`
    width: ${getDimension(216)};
    right: ${({ offset, s }) => offset - s * 8}px;
    top: 50%;
    ${anim(
        slidetop,
        600,
        css`
            transform: scale(0) translateY(${getDimension(-200)}) rotate(180deg);
        `
    )}
    ${getAnimationDelay(800)}
    .inner {
        transform: translateY(-50%) rotate(45deg);
        div {
            border: ${getDimension(10)} solid ${colors.blue};
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            box-sizing: content-box;
            box-shadow: ${getDimension(7)} ${getDimension(7)} 0px 0px ${color('border')};
        }
    }
`

export const Tildes = (properties) => (
    <TildesSC className="tildes" {...properties}>
        <Tilde1 className="tilde tilde1" {...properties}>
            ~
        </Tilde1>
        <Tilde2 className="tilde tilde2" {...properties}>
            ~
        </Tilde2>
        <Tilde3 className="tilde tilde3" {...properties}>
            ~
        </Tilde3>
    </TildesSC>
)

const TildesSC = styled.div`
    position: absolute;
    top: ${getDimension(80)};
    right: ${({ offset, s }) => offset - s * 56}px;
`

const Tilde = styled.div`
    font-size: ${getDimension(112)};
    line-height: 1;
    position: absolute;
    ${anim(
        slideright,
        400,
        css`
            opacity: 0;
            transform: translateX(${getDimension(-40)});
        `
    )}
`

const Tilde1 = styled(Tilde)`
    top: 0;
    right: 0;
    ${getAnimationDelay(1900)}
`
const Tilde2 = styled(Tilde)`
    top: ${getDimension(20)};
    right: ${getDimension(-8)};
    ${getAnimationDelay(1900, 100)}
`
const Tilde3 = styled(Tilde)`
    top: ${getDimension(40)};
    right: ${getDimension(-16)};
    ${getAnimationDelay(1900, 200)}
`

export const logoElements = [Triangle, Stripes, Circle, Frame, Tildes]

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
