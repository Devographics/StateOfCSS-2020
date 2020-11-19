import range from 'lodash/range'

export const colors = {
    greyLight: '#e0e4e4',
    grey: '#d9dedf',
    greyMedium: '#cecdcc',
    greyMediumer: '#616868',
    greyMediumest: '#5c6069',
    greyDark: '#4d4f4f',
    greyDarkish: '#2a2d33',
    greyDarker: '#222429',

    blueLighter: '#B2BBEE',
    blueLight: '#808EE1',
    blue: '#3c52d1',
    blueDark: '#273aa2',

    pinkLightest: '#D3BBF2',
    pinkLighter: '#D68DF0',
    pinkLight: '#EC75CB',
    pink: '#F649A7',
    pinkDark: '#e86ebf',

    greenLighter: '#E7FFED',
    greenLight: '#ACFFC3',
    green: '#85EBA2',
    greenDark: '#59DF7F',

    tealLighter: '#94eeee',
    tealLight: '#65e0e0',
    teal: '#41c7c7',
    tealDark: '#2ba7a7',
    tealDarker: '#1d7e7e',

    purpleLight: '#B096E7',
    purple: '#7854C3',
    purpleDark: '#57457C',

    redLighter: '#f8a8a8',
    redLight: '#fc8f8f',
    red: '#FE6A6A',
    redDark: '#ec5555',
    redDarker: '#be3737',

    yellow: '#fbf34c',
    skyblue: '#1ea0f2',
    orange: '#EF8D33',
    olive: '#599E38',
    aqua: '#3ABBB3',
    indigo: '#4861EC',

    white: '#ffffff',

    navyLightest: '#7e86ad',
    navyLighter: '#484F73',
    navyLight: '#303652',
    navy: '#232840',
    navyDark: '#1a1f35',
}

export const toolCategories = [
    { id: 'pre_post_processors', color: colors.indigo },
    { id: 'css_frameworks', color: colors.pink },
    { id: 'css_methodologies', color: colors.red },
    { id: 'css_in_js', color: colors.purple },
]

export const featureCategories = [
    { id: 'layout', color: colors.indigo },
    { id: 'shapes_graphics', color: colors.pink },
    { id: 'interactions', color: colors.red },
    { id: 'typography', color: colors.purple },
    { id: 'animations_transforms', color: colors.orange },
    { id: 'media_queries', color: colors.green },
    { id: 'other_features', color: colors.skyblue },
]

export const getColor = (id) => {
    return [...toolCategories, ...featureCategories].find((color) => color.id === id).color
}

/*

Keys

*/
const generateProficiencyKeys = (proficiencyId) => ({
    keys: [0, 1, 2, 3, 4].map((id) => ({
        id,
        label: `options.${proficiencyId}.${id}`,
        shortLabel: `options.proficiency.${id}`,
    })),
})

const generateEnvironmentRatingKeys = (environmentId) => ({
    keys: [0, 1, 2, 3].map((id) => ({
        id,
        label: `options.${environmentId}.${id}`,
        shortLabel: `options.${environmentId}.${id}.short`,
    })),
})

export const keys = {
    yearly_salary: {
        keys: [
            'range_work_for_free',
            'range_0_10',
            'range_10_30',
            'range_30_50',
            'range_50_100',
            'range_100_200',
            'range_more_than_200',
        ].map((id) => ({
            id,
            label: `options.yearly_salary.${id}`,
            shortLabel: `options.yearly_salary.${id}.short`,
        })),
    },
    company_size: {
        keys: [
            'range_1',
            'range_1_5',
            'range_5_10',
            'range_10_20',
            'range_20_50',
            'range_50_100',
            'range_100_1000',
            'range_more_than_1000',
        ].map((id) => ({
            id,
            label: `options.company_size.${id}`,
            shortLabel: `options.company_size.${id}.short`,
        })),
    },
    years_of_experience: {
        keys: [
            'range_less_than_1',
            'range_1_2',
            'range_2_5',
            'range_5_10',
            'range_10_20',
            'range_more_than_20',
        ].map((id) => ({
            id,
            label: `options.years_of_experience.${id}`,
            shortLabel: `options.years_of_experience.${id}.short`,
        })),
    },
    gender: {
        colorRange: 'gender',
        keys: [
            {
                id: 'male',
                label: 'options.gender.male',
            },
            {
                id: 'female',
                label: 'options.gender.female',
            },
            {
                id: 'non_binary',
                label: 'options.gender.non_binary',
            },
            {
                id: 'prefer_not_to_say',
                label: 'options.gender.prefer_not_to_say',
            },
        ],
    },
    race_ethnicity: {
        keys: [
            { id: 'biracial' },
            { id: 'black_african' },
            { id: 'east_asian' },
            { id: 'hispanic_latin' },
            { id: 'middle_eastern' },
            { id: 'multiracial' },
            { id: 'native_american_islander_australian' },
            { id: 'south_asian' },
            { id: 'white_european' },
        ],
    },
    environmentUsage: {
        keys: [{ id: 'never' }, { id: 'occasionally' }, { id: 'often' }, { id: 'mainly' }],
    },
    jobTitle: {
        keys: [
            { id: 'full_stack_developer' },
            { id: 'front_end_developer' },
            { id: 'back_end_developer' },
            { id: 'web_designer' },
            { id: 'ui_designer' },
            { id: 'ux_designer' },
            { id: 'web_developer' },
        ],
    },
    css_proficiency: generateProficiencyKeys('css_proficiency'),
    javascript_proficiency: generateProficiencyKeys('javascript_proficiency'),
    backend_proficiency: generateProficiencyKeys('backend_proficiency'),
    happiness: {
        keys: [0, 1, 2, 3, 4].map((id) => ({
            id,
            label: `options.happiness.${id}`,
            shortLabel: `options.happiness.${id}.short`,
        })),
    },
    knowledge_score: {
        keys: range(1, 100).map((n) => ({ id: n })),
    },
    opinions: {
        colorRange: 'opinions',
        keys: [
            {
                id: 4,
                label: 'options.opinions.4',
            },
            {
                id: 3,
                label: 'options.opinions.3',
            },
            {
                id: 2,
                label: 'options.opinions.2',
            },
            {
                id: 1,
                label: 'options.opinions.1',
            },
            {
                id: 0,
                label: 'options.opinions.0',
            },
        ],
    },
    tools: {
        colorRange: 'tools',
        keys: [
            {
                id: 'would_use',
                label: 'options.tools.would_use.legend',
                shortLabel: 'options.tools.would_use.short',
            },
            {
                id: 'would_not_use',
                label: 'options.tools.would_not_use.legend',
                shortLabel: 'options.tools.would_not_use.short',
            },
            {
                id: 'interested',
                label: 'options.tools.interested.legend',
                shortLabel: 'options.tools.interested.short',
            },
            {
                id: 'not_interested',
                label: 'options.tools.not_interested.legend',
                shortLabel: 'options.tools.not_interested.short',
            },
            {
                id: 'never_heard',
                label: 'options.tools.never_heard.legend',
                shortLabel: 'options.tools.never_heard.short',
            },
        ],
    },
    features: {
        colorRange: 'features',
        keys: [
            {
                id: 'used',
                label: 'options.features.used.label',
                shortLabel: 'options.features.used.short',
            },
            {
                id: 'heard',
                label: 'options.features.heard.label',
                shortLabel: 'options.features.heard.short',
            },
            {
                id: 'never_heard',
                label: 'options.features.never_heard.label',
                shortLabel: 'options.features.never_heard.short',
            },
        ],
    },
    features_simplified: {
        colorRange: 'features_simplified',
        keys: [
            {
                id: 'know_it',
                label: 'options.features_simplified.know_it',
            },
            {
                id: 'used_it',
                label: 'options.features_simplified.used_it',
            },
        ],
    },
    toolCategories,
    css_for_print: generateEnvironmentRatingKeys('css_for_print'),
    css_for_email: generateEnvironmentRatingKeys('css_for_email'),
}

export const fontFamily = `'IBM Plex Mono', monospace`