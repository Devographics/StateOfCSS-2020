import React from 'react'
import styled from 'styled-components'
import locales from '../../../../config/locales.yml'
import { useI18n } from 'core/i18n/i18nContext'
import { mq, spacing } from 'core/theme'

const TranslatorsBlock = () => {
    const { translate } = useI18n()

    return (
        <>
            <Container>
                <Header>{translate('general.translation_help')}</Header>
                <Locales>
                    {locales
                        .filter(({ locale }) => locale !== 'en-US')
                        .map(({ label, translators }) => (
                            <Locale key={label}>
                                <LocaleLabel>{label}</LocaleLabel>
                                <Translators>
                                    {translators.map(({ name, github }) => (
                                        <Translator key={name}>
                                            <a href={github}>{name}</a>
                                        </Translator>
                                    ))}
                                </Translators>
                            </Locale>
                        ))}
                </Locales>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: ${spacing(2)};
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    border: ${(props) => props.theme.separationBorder};
    padding: ${spacing(2)};
`

const Header = styled.h3`
    text-align: center;
    margin-bottom: ${spacing()};
`

const Locales = styled.div`
    display: grid;
    @media ${mq.smallMedium} {
        grid-template-columns: 1fr 1fr;
        column-gap: ${spacing(0.5)};
        row-gap: ${spacing(0.5)};
    }
    @media ${mq.large} {
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: ${spacing()};
        row-gap: ${spacing()};
    }
`

const Locale = styled.div``

const LocaleLabel = styled.h4`
    margin-bottom: 0;
`

const Translators = styled.div``

const Translator = styled.span`
    &:after {
        content: ', ';
    }
    &:last-child:after {
        content: none;
    }
`
export default TranslatorsBlock
