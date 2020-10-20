import React, { createContext, useContext, useMemo } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { getTranslator } from './translator'
import { usePageContext } from '../helpers/pageContext'

export const I18nContext = createContext()

const translationsQuery = graphql`
    query {
        translations: surveyApi {
            locales {
                locale: id
                translations: strings {
                    key
                    t
                }
            }
        }
    }
`

const I18nContextProviderInner = ({ children, translations }) => {
    const context = usePageContext()

    if (!context.locale) {
        throw new Error(`No locale defined in context`)
    }

    const catalogue = useMemo(() => translations.find((t) => t.locale === context.locale), [
        translations,
        context.locale,
    ])
    if (!catalogue) {
        throw new Error(
            `Could not find catalogue for locale ${
                context.locale
            }. Available locales: ${translations.map((t) => t.locale).join(', ')}`
        )
    }

    const translate = useMemo(() => getTranslator(catalogue), [catalogue])

    const value = useMemo(
        () => ({
            catalogue,
            translate,
        }),
        [catalogue, translate]
    )

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const I18nContextProvider = ({ children }) => {
    return (
        <StaticQuery query={translationsQuery}>
            {({ translations }) => (
                <I18nContextProviderInner translations={translations.locales}>
                    {children}
                </I18nContextProviderInner>
            )}
        </StaticQuery>
    )
}

export const useI18n = () => useContext(I18nContext)
