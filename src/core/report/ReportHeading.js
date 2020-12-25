import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { mq, spacing, fontSize, fontWeight, color } from 'core/theme'
import { bigElements, smallElements } from 'core/components/LogoElements'
import sampleSize from 'lodash/sampleSize'
import sample from 'lodash/sample'
import random from 'lodash/random'
import { useInView } from 'react-intersection-observer'
import colors from 'core/theme/colors'

const buffer = 0.2
const bufferPercent = buffer * 100

export function useForceUpdate() {
    const [, setTick] = useState(0)
    const update = useCallback(() => {
        setTick((tick) => tick + 1)
    }, [])
    return update
}

export default ({ children }) => {
    const [part1, part2] = children.split('|')

    const forceUpdate = useForceUpdate()

    const { ref, inView, entry } = useInView({
        /* Optional options */
        rootMargin: `-${bufferPercent}% 0% -${bufferPercent}% 0%`,
        threshold: 0,
        triggerOnce: true,
    })

    return (
        <Heading
            className="Heading Logo__Container"
            onClick={() => {
                forceUpdate()
            }}
        >
            <LogoElements className="LogoElements">
                {sampleSize(bigElements, 1).map((Component, i) => (
                    <LogoElementWrapperBig
                        className="Logo__Element__Wrapper"
                        key={i}
                        scale={random(0.6, 0.8)}
                        top={random(0, 30)}
                        left={random(45, 50)}
                    >
                        <Component
                            animated={true}
                            triggerAnimation={inView}
                            delay={200 + i * 200}
                        />
                    </LogoElementWrapperBig>
                ))}
                {sampleSize(smallElements, 2).map((Component, i) => (
                    <LogoElementWrapperSmall
                        className="Logo__Element__Wrapper"
                        key={i}
                        scale={random(0.6, 0.8)}
                        top={sample([random(-10, 0), random(70, 80)])}
                        left={random(40, 50)}
                    >
                        <Component
                            animated={true}
                            triggerAnimation={inView}
                            delay={200 + i * 200}
                        />
                    </LogoElementWrapperSmall>
                ))}
            </LogoElements>
            <LogoContents className="LogoContents" ref={ref}>
                <Part1>{part1.trim()}</Part1> <Part2>{part2.trim()}</Part2>
            </LogoContents>
        </Heading>
    )
}

const Heading = styled.h2`
    text-align: center;
    font-size: ${fontSize('huge')};
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0 ${spacing(2)};
    font-weight: ${fontWeight('bold')};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: visible !important;
    margin-top: ${spacing(6)};
    margin-bottom: ${spacing(6)};
`

const LogoElements = styled.div`
    /* position: absolute !important; */
    /* opacity: 0.7; */
`

const LogoElementWrapper = styled.div`
    transform: scale(${({ scale }) => scale});
    top: ${({ top }) => top}%;
    left: ${({ left }) => left}%;
    position: absolute;
`

const LogoElementWrapperBig = styled(LogoElementWrapper)`

`
const LogoElementWrapperSmall = styled(LogoElementWrapper)`
    z-index: 2;
`

const LogoContents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: relative;
    cursor: pointer;
`

const Part = styled.span`
    /* color: ${color('link')}; */
    /* color: ${colors.blue}; */

    text-shadow: 4px 4px 0px ${colors.blue};
    /* display: block; */
    padding: 5px 15px;
    line-height: 1;
    /* position: relative; */
    background: ${colors.pink};
`

const Part1 = styled(Part)`
    margin-bottom: ${spacing()};
    /* left: -${spacing(6)}; */
`

const Part2 = styled(Part)`
    /* right: -${spacing(6)}; */
`
