import React, { useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { mq, spacing, color } from 'core/theme'
import ReactMarkdown from 'react-markdown/with-html'

// From 0 (top) to 1(bottom), where in the viewport should the trigger happen
const topViewportTriggerPoint = 0.8
const bottomViewportTriggerPoint = 0.2

const Overlay = ({ id, triggerId, setTriggerId, isFirst, isLast, children }) => {
    const overlayRef = useRef()

    const isTriggered = triggerId === id

    // use a default position of +/-999999 so that animation never triggers
    const [overlayTop, setOverlayTop] = useState(999999)
    const [overlayBottom, setOverlayBottom] = useState(-999999)

    useLayoutEffect(() => {
        if (id) {
            const onScroll = () => {
                if (overlayTop === 999999) {
                    // if hint position hasn't been set yet, set it
                    setOverlayTop(overlayRef.current.getBoundingClientRect().top + window.scrollY)
                    setOverlayBottom(
                        overlayRef.current.getBoundingClientRect().bottom + window.scrollY
                    )
                }
                // trigger animation when element reaches trigger points
                const bottomTrigger =
                    window.scrollY + window.innerHeight * bottomViewportTriggerPoint
                const topTrigger = window.scrollY + window.innerHeight * topViewportTriggerPoint
                if (bottomTrigger <= overlayBottom && topTrigger > overlayTop) {
                    // console.log(`triggered! ${id}`)
                    setTriggerId && setTriggerId(id)
                    // once animation is triggered, remove event listener
                    // window.removeEventListener('scroll', onScroll)
                } else if (
                    (isFirst && bottomTrigger <= overlayTop) ||
                    (isLast && topTrigger > overlayBottom)
                ) {
                    // we are leaving the first overlay going towards the top
                    // we are leaving the last overlay going towards the bottom
                    setTriggerId && setTriggerId(null)
                }
            }
            window.addEventListener('scroll', onScroll)
            return () => window.removeEventListener('scroll', onScroll)
        }
    }, [isFirst, isLast, overlayBottom, overlayTop, id, setTriggerId])

    return (
        <OverlayContainer className="OverlayContainer">
            <OverlayContents className="OverlayContents" ref={overlayRef} isTriggered={isTriggered}>
                <ReactMarkdown source={children} escapeHtml={false} />
            </OverlayContents>
            <OverlaySpacer className="OverlaySpacer" />
        </OverlayContainer>
    )
}

const OverlayContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /* background: #ff000011; */
    z-index: 100;
    position: relative;
    flex-direction: column;
    padding-top: ${spacing(2)};
`

const OverlaySpacer = styled.div`
    width: 100%;
    height: 100vh;
    pointer-events: none;
`
const OverlayContents = styled.div`
    background: ${color('backgroundAlt')}ee;
    padding: ${spacing()};
    ${({ isTriggered }) =>
        isTriggered &&
        css`
            background: ${color('backgroundForeground')};
        `}
    box-shadow: ${({ theme }) => theme.blockShadow};
    p{
        &:last-child{
            margin: 0;
        }
    }
`

export default Overlay
