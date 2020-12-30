import React from 'react'
import ReportContents from 'config/report.mdx'
import styled from 'styled-components'
import { mq, color, spacing, fontSize, fontWeight } from 'core/theme'
import Logo from 'core/components/Logo'
import Footer from 'core/components/Footer'
import LanguageSwitcher from 'core/i18n/LanguageSwitcher'

const debug = false

export default () => (
    <Report className="Report">
        {/* <Language>
            <LanguageSwitcher locales={['en-US']}/>
        </Language> */}
        <LogoWrapper>
            <Logo size="l" report={true} />
        </LogoWrapper>
        <ReportContents />
        <Footer />

        {debug && (
            <>
                <TopTrigger />
                <BottomTrigger />
            </>
        )}
    </Report>
)

const Trigger = styled.div`
    position: fixed;
    height: 1px;
    background: red;
    left: 0px;
    right: 0px;
    z-index: 10000;
`
const TopTrigger = styled(Trigger)`
    top: 20vh;
`
const BottomTrigger = styled(Trigger)`
    top: 80vh;
`
const Report = styled.div`
    @media ${mq.small} {
        padding: ${spacing(2)} 0;
    }
    @media ${mq.mediumLarge} {
        padding: ${spacing(4)} 0;
    }
    .first {
    }
    & > p {
        position: relative;
        z-index: 2;
        @media ${mq.small} {
            font-size: ${fontSize('smallish')};
            line-height: 1.8;
            margin-bottom: ${spacing(1)};
            &:first-of-type:first-line {
                font-size: 1.3rem;
            }
        }

        @media ${mq.mediumLarge} {
            font-size: 1.2rem;
            line-height: 2;
            margin-bottom: ${spacing(1.5)};
            &:first-of-type:first-line {
                font-size: 2.3rem;
            }
        }
    }
    code {
        background: ${color('backgroundAlt')};
        padding: 3px 6px;
        font-weight: ${fontWeight('medium')};
        color: ${color('link')};
        border: 1px dotted ${color('link')};
        font-size: ${fontSize('smallish')};
    }
    .ChartContainer {
        /* overflow: hidden; */
    }
`

const LogoWrapper = styled.div`
    @media ${mq.mediumLarge} {
        margin-bottom: ${spacing(4)};
    }
`

const Language = styled.div`
    margin-bottom: ${spacing(2)};
`
