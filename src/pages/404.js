import React from 'react'
import TextBlock from 'core/blocks/other/TextBlock'
// import { useI18n } from 'core/i18n/i18nContext'

const NotFound = () => {
    // const { translate } = useI18n()
    return (
        <>
            {/* <TextBlock text={translate('general.not_found')} /> */}
            <TextBlock text={'404 Not Found'} />
        </>
    )
}

export default NotFound
