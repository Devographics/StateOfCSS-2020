import React, { createContext, useContext, useMemo } from 'react'
import { getTranslator } from './translator'
import { usePageContext } from '../helpers/pageContext'

export const I18nContext = createContext()

const I18nContextProviderInner = ({ children }) => {
    const context = usePageContext()
    const { locales, locale } = context
    if (!locale) {
        throw new Error(`No locale defined in context`)
    }

    const catalogue = useMemo(() => locales.find((t) => t.id === locale.id), [locales, locale])

    if (!catalogue) {
        throw new Error(
            `Could not find catalogue for locale ${
                locale.id
            }. Available locales: ${locales.map((t) => t.id).join(', ')}`
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
    return <I18nContextProviderInner>{children}</I18nContextProviderInner>
}

export const useI18n = () => useContext(I18nContext)
