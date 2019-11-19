export const dollars = value => `$${rounded(value, 2)}`
export const rounded = value => (Math.round(value * 100) / 100).toFixed(2)