import React from 'react'
import styled, { css } from 'styled-components'
import { mq, spacing, color } from 'core/theme'
import range from 'lodash/range'
import random from 'lodash/random'
import sample from 'lodash/sample'
import { bigElements, smallElements } from 'core/components/LogoElements'

const EssayLayout = ({ props }) => {
    return (
        <Page>
            <PageContent className="PageContent">
                {/* <PageBackground className="PageBackground">
                    {range(300).map((i) => {
                        const Component = sample([...bigElements, ...smallElements])
                        return (
                            <LogoElementWrapper
                                className="Logo__Element__Wrapper"
                                key={i}
                                scale={random(0.6, 0.8)}
                                bottom={`${random(0, 20)}px`}
                                rotate={`${random(0, 180)}deg`}
                                left={`${random(0, 100)}%`}
                            >
                                <Component animated={false} />
                            </LogoElementWrapper>
                        )
                    })}
                </PageBackground> */}
                <PageMain>
                    {/* <PageMetaDebug /> */}
                    {props.children}
                </PageMain>
            </PageContent>
        </Page>
    )
}

const Page = styled.div``

const PageContent = styled.main`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 ${spacing()};
    position: relative;
`

const PageBackground = styled.div`
    position: fixed;
    height: 60vh;
    background: ${color('backgroundAlt')};
    width: 100%;
    left: 0;
`

const PageMain = styled.main`
    /* position: absolute;
    z-index: 2; */
`

const LogoElementWrapper = styled.div`
    bottom: ${({ bottom }) => bottom};
    left: ${({ left }) => left};
    transform: rotate(${({ rotate }) => rotate});
    position: absolute;
    .frame .inner div,
    .stripe,
    .circle .inner div,
    .triangle .inner,
    .tilde {
        border-color: ${color('backgroundAlt')};
        color: ${color('backgroundAlt')};
        box-shadow: none;
    }
    .blob{
        display: none;
    }
`
export default EssayLayout
