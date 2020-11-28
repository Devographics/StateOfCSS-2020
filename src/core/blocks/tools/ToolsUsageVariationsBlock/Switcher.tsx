import React from 'react'
// @ts-ignore
import { useI18n } from 'core/i18n/i18nContext'
// @ts-ignore
import ButtonGroup from 'core/components/ButtonGroup'
// @ts-ignore
import Button from 'core/components/Button'
import { RANGE_TYPES, RangeType } from './types'

export const Switcher = ({
    setRangeType,
    rangeType,
}: {
    setRangeType: (rangeType: RangeType) => void
    rangeType: RangeType
}) => {
    const { translate } = useI18n()

    return (
        <ButtonGroup>
            {RANGE_TYPES.map((key) => (
                <Button
                    key={key}
                    size="small"
                    className={`Button--${rangeType === key ? 'selected' : 'unselected'}`}
                    onClick={() => setRangeType(key)}
                >
                    <span className="desktop">{translate(`ranges.selector.${key}`)}</span>
                    <span className="mobile">{translate(`ranges.selector.${key}`)[0]}</span>
                </Button>
            ))}
        </ButtonGroup>
    )
}
