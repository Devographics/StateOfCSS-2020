import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeContext } from 'styled-components'
import { mq, spacing, fontSize } from 'core/theme'
import { useI18n } from 'core/i18n/i18nContext'
import { keys } from 'core/constants'
import BlockLegendsItem from './BlockLegendsItem'

const BlockLegends = ({
    block,
    layout = 'horizontal',
    withFrame,
    chipSize,
    style,
    itemStyle,
    chipStyle,
    onMouseEnter,
    onMouseLeave,
    onClick,
    data,
    legends,
    units,
}) => {
    const { id: blockId, bucketKeysName = blockId } = block
    const { translate } = useI18n()
    const theme = useContext(ThemeContext)
    const blockKeys = keys[bucketKeysName]

    if (!legends && !blockKeys) {
        throw new Error(
            `Could not find any keys defined for ${bucketKeysName}. If there are none, set "showLegend: false" on block definition.`
        )
    }

    const blockLegends =
        legends ||
        blockKeys.map(({ id: keyId }) => ({
            id: `${bucketKeysName}.${keyId}`,
            label: translate(`options.${bucketKeysName}.${keyId}`),
            keyLabel: `${translate(`options.${bucketKeysName}.${keyId}.short`)}:`,
            color: theme.colors.ranges[bucketKeysName]
                ? theme.colors.ranges[bucketKeysName][keyId]
                : undefined,
        }))

    console.log({
        bucketKeysName,
        blockLegends,
    })

    const rootStyle = { ...style }

    return (
        <Container style={rootStyle} layout={layout} withFrame={withFrame}>
            {blockLegends.map(({ id, label, color, keyLabel }) => (
                <BlockLegendsItem
                    key={id}
                    id={id}
                    label={label}
                    color={color}
                    style={itemStyle}
                    chipSize={chipSize}
                    chipStyle={chipStyle}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                    keyLabel={keyLabel}
                    data={data && Array.isArray(data) && data.find((b) => b.id === id)}
                    units={units}
                />
            ))}
        </Container>
    )
}

BlockLegends.propTypes = {
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    withFrame: PropTypes.bool.isRequired,
    chipSize: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    itemStyle: PropTypes.object.isRequired,
    chipStyle: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

BlockLegends.defaultProps = {
    layout: 'horizontal',
    withFrame: true,
    style: {},
    itemStyle: {},
    chipStyle: {},
    chipSize: 16,
}

const Container = styled.div`
    font-size: ${fontSize('small')};
    margin-top: ${spacing()};
    
    ${(props) => {
        if (props.layout === 'horizontal') {
            return `
                @media ${mq.mediumLarge} {
                    display: grid;
                }
                
                @media ${mq.medium} {
                    grid-template-columns: 1fr 1fr;
                }
                
                @media ${mq.large} {
                    // fit in as many columns as possible as long as they're wider than 150px
                    grid-template-columns: repeat(auto-fit, minmax(120px, auto));
                }
            `
        }

        if (props.layout === 'vertical') {
            return `
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                @media ${mq.small} {
                    margin-top: ${spacing()};
                    border: 1px solid ${props.theme.colors.border};
                }
            `
        }
    }}
    
    ${(props) =>
        props.withFrame &&
        `
        border: 1px solid ${props.theme.colors.border};
        padding: ${spacing()};
        
        @media ${mq.small} {
            padding: ${spacing(0.5)};
        }
        
        @media ${mq.mediumLarge} {
            padding: ${spacing()} ${spacing(1.5)};
        }
    `}
}
`

export default BlockLegends
