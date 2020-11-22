import React from 'react'
import { useI18n } from 'core/i18n/i18nContext'
import TextBlock from 'core/blocks/other/TextBlock'
import Logo from 'core/components/Logo'
import IntroductionFooter from 'core/pages/IntroductionFooter'

const SurveyIntroBlock = () => {
    const { translate } = useI18n()

    return (
        <>
            <Logo size="l" />
            <div className="SurveyIntro">
                <div className="SurveyIntro__Content">
                    <TextBlock text={translate('sections.introduction.description')} />
                    <IntroductionFooter />
                </div>
            </div>
        </>
    )
}

export default SurveyIntroBlock
