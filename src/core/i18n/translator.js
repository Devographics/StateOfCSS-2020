import template from 'lodash/template'

export const getTranslator = (locale = {}) => (key, { values } = {}, fallback) => {
    const { id, strings = [] } = locale
    // reverse strings so that strings added last take priority
    const translation = strings.reverse().find((t) => t.key === key)

    if (translation === undefined) {
        return typeof fallback === 'undefined' ? `[${id}] ${key}` : fallback
    }

    if (values === undefined) return translation.t

    try {
        return template(translation.t)(values)
    } catch (error) {
        // console.error(error)
        return `[${id}][ERR] ${key}`
    }
}

export const translateOrFallback = (translatedKey, fallback) =>
    translatedKey.match(/\[[a-z]{2}-[A-Z]{2}?\] [a-z_\-.]+/) ? fallback : translatedKey
