import React from 'react'

const Logo = ({ className, animated = true, showText = true, size = 'l' }) => (
    <div aria-hidden="true" className={`Logo__Container Logo--${size} ${className || ''}`}>
        <div className={`Logo ${animated ? 'Logo--animated' : ''}`}>
            <SVGFilter />
            <Triangle />
            <Blobs />
            {size !== 's' && <Stripes />}
            <Circle />

            <Frame />
            {size !== 's' && <Tildes />}
            {showText && <div className="text stateof">State Of</div>}
            <div className="letter c">
                <div>C</div>
            </div>
            <div className="letter s1">
                <div>S</div>
            </div>
            <div className="letter s2">
                <div>S</div>
            </div>
            {showText && <div className="text year">2020</div>}
        </div>
    </div>
)

export const Triangle = () => (
    <div className="triangle">
        <div className="inner" />
    </div>
)

export const Blobs = () => (
    <div className="blobs">
        <div className="blob blob1" />
        <div className="blob blob2" />
    </div>
)

export const Stripes = () => (
    <div className="stripes">
        <div className="stripe stripe1" />
        <div className="stripe stripe2" />
        <div className="stripe stripe3" />
        <div className="stripe stripe4" />
    </div>
)

export const Circle = () => (
    <div className="circle">
        <div className="inner">
            <div />
        </div>
    </div>
)

export const Frame = () => (
    <div className="frame">
        <div className="inner">
            <div />
        </div>
    </div>
)

export const Tildes = () => (
    <div className="tildes">
        <div className="tilde tilde1">~</div>
        <div className="tilde tilde2">~</div>
        <div className="tilde tilde3">~</div>
    </div>
)

export const logoElements = [Triangle, Stripes, Circle, Frame, Tildes]

const SVGFilter = () => (
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
