import { css, keyframes } from 'styled-components'

export const appear = keyframes`
to {
    opacity: 1;
}
`

export const pop = keyframes`
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

export const popspin = keyframes`
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

export const slideleft = keyframes`
0% {
    opacity: 0;
    transform: translateX(40px);
}
100% {
    opacity: 1;
    transform: translateX(0px);
}
`
export const slideright = keyframes`
0% {
    opacity: 0;
    transform: translateX(-40px);
}
100% {
    opacity: 1;
    transform: translateX(0px);
}
`

export const slidetop = keyframes`
0% {
    opacity: 0;
    transform: translateY(-200px) rotate(180deg);
}
100% {
    opacity: 1;
    transform: translateY(0px) rotate(0deg);
}
`
export const blob = keyframes`
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

export const getOffset = () => ({ offset = 1 }) => `${offset}px`
export const getDimension = (d) => ({ s = 1 }) => `${d * s}px`
export const getTop = () => ({ s = 1, top = 0 }) => `${top * s}px`
export const getLeft = () => ({ s = 1, left = 0 }) => `${left * s}px`
export const getRight = () => ({ s = 1, right = 0 }) => `${right * s}px`

/*

Use either default delay defined in styled components or override it with
`delay` prop

*/
export const getAnimationDelay = (offsetDelay = 0) => ({ delay }) =>
    css`
        animation-delay: ${delay + offsetDelay}ms;
    `

// ${css`animation-fill-mode: ${triggerAnimation? 'forwards' : 'none'};`}

export const anim = (animation, duration, startingStyles) => ({ animated, triggerAnimation }) =>
    css`
        ${triggerAnimation &&
        css`
            animation-iteration-count: 1;
            animation-name: ${animation};
            animation-fill-mode: forwards;
            animation-duration: ${duration}ms;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `}
        ${animated &&
        css`
            ${startingStyles}
        `}
    `
