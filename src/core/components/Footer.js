import React from 'react'
import styled from 'styled-components'
import { mq, spacing, fontSize } from 'core/theme'
import { usePageContext } from 'core/helpers/pageContext'
import config from 'config/config.yml'
import T from 'core/i18n/T'

const Footer = () => {
    const context = usePageContext()

    return (
        <Notes>
            <T k="general.charts_nivo" values={{ link: 'https://nivo.rocks/' }} html={true} />{' '}
            <T k="general.netlify_link" values={{ link: 'https://www.netlify.com' }} html={true} />
            <br />
            <T k="general.leave_issue" values={{ link: config.issuesUrl }} html={true} />{' '}
            <T k="general.join_discord" values={{ link: config.discordUrl }} html={true} />
            {context.locale.id !== 'en-US' && (
                <>
                    <br />
                    <T k="general.translator_mode" />{' '}
                </>
            )}
        </Notes>
    )
}

const Notes = styled.div`
    font-size: ${fontSize('small')};
    text-align: center;

    @media ${mq.small} {
        margin-top: ${spacing(4)};
    }
    @media ${mq.mediumLarge} {
        margin-top: ${spacing(4)};
    }
`

export default Footer
