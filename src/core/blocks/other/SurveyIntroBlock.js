import React from 'react'
import { useI18n } from 'core/i18n/i18nContext'
import TextBlock from 'core/blocks/other/TextBlock'
import Logo from 'core/components/Logo'
// import SponsorsBlock from 'core/blocks/other/SponsorsBlock'
// import TranslatorsBlock from 'core/blocks/other/TranslatorsBlock'
import NewsletterBlock from 'core/blocks/other/NewsletterBlock'
import IntroductionFooter from 'core/pages/IntroductionFooter'

const SurveyIntroBlock = () => {
    const { translate } = useI18n()

    return (
        <>
            <Logo size="l" />
            <div className="SurveyIntro">
                <div className="SurveyIntro__Content">
                    <TextBlock text={translate('sections.introduction.introduction')} />
                    <IntroductionFooter />
                </div>
                <NewsletterBlock />
                {/*
                <SponsorsBlock />
                <TranslatorsBlock />
                */}
            </div>
        </>
    )
}

export default SurveyIntroBlock
