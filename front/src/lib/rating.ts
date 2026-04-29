export type RatingColorMode = 'light' | 'dark'

export function getRatingColor(
  performance: number | null,
  mode: RatingColorMode = 'light',
): string {
  if (performance == null) return 'inherit'

  const colors =
    mode === 'dark'
      ? {
          red: '#ff5c5c',
          orange: '#ff9f43',
          yellow: '#d6c447',
          blue: '#60a5fa',
          cyan: '#22d3ee',
          green: '#22c55e',
          brown: '#b7794a',
          gray: '#9ca3af',
        }
      : {
          red: '#FF0000',
          orange: '#FF8000',
          yellow: '#C0C000',
          blue: '#0000FF',
          cyan: '#00C0C0',
          green: '#008000',
          brown: '#804000',
          gray: '#808080',
        }

  if (performance >= 2800) return colors.red
  if (performance >= 2400) return colors.orange
  if (performance >= 2000) return colors.yellow
  if (performance >= 1600) return colors.blue
  if (performance >= 1200) return colors.cyan
  if (performance >= 800) return colors.green
  if (performance >= 400) return colors.brown
  return colors.gray
}
