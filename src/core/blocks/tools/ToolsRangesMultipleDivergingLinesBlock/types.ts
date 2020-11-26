export const RANGE_TYPES = ['years_of_experience', 'yearly_salary', 'company_size'] as const
export type RangeType = typeof RANGE_TYPES[number]
