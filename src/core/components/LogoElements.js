import React from 'react'
import styled, { css } from 'styled-components'
import { color } from 'core/theme'
import colors from 'core/theme/colors'
import {
    getDimension,
    getAnimationDelay,
    getTop,
    getLeft,
    getRight,
    anim,
    getOffset,
    pop,
    popspin,
    slideright,
    slideleft,
    blob,
    slidetop,
} from './logoHelpers'

export const Triangle = (properties) => (
    <TriangleSC className="triangle" {...properties}>
        <div className="inner" />
    </TriangleSC>
)

const TriangleSC = styled.div`
    width: ${getDimension(144)};
    top: ${getTop()};
    left: ${getLeft()};
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
    top: ${getTop()};
    left: ${getLeft()};
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
    top: ${getTop()};
    left: ${getLeft()};
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
    left: calc(50% - ${getLeft()});
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
    right: ${getRight()};
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
    top: ${getTop()};
    right: ${getRight()};
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

export const bigElements = [Triangle, Circle, Frame, Blobs]
export const smallElements = [Stripes, Tildes]
