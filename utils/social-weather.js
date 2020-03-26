import colors from 'vuetify/es5/util/colors'

export const timeframes = {
  '1y': {
    unit: 'month',
    tooltipFormat: 'MMM YYYY'
  },
  '3m': {
    unit: 'day',
    tooltipFormat: 'MMM D'
  },
  '1m': {
    unit: 'day',
    tooltipFormat: 'MMM D'
  },
  '1w': {
    unit: 'day',
    tooltipFormat: 'MMM D hA'
  },
  '1d': {
    unit: 'hour',
    tooltipFormat: 'MMM D hA'
  }
}

export const defaultTimeframe = '1m'

export const maximumComparisons = 4

export const chartColors = [
  colors.teal.base,
  colors.purple.base,
  colors.orange.base,
  colors.blue.base
]

export const formatPerformance = (n) => {
  if (n >= 1) return `${n.toFixed(2)}x`
  if (n > 0 && n < 1) return `-${(1 / n).toFixed(2)}x`
  return 'N/A'
}

export const formatCount = (n) => {
  if (n === undefined || n === null) return ''
  if (n < 2e3) return `${n}`
  if (n >= 2e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
  if (n >= 2e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
  if (n >= 2e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
  if (n >= 2e12) return +(n / 1e12).toFixed(1) + 'T'
  return 'N/A'
}
