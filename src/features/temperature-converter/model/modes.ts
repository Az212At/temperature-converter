export type ConversionMode = 'CtoF' | 'FtoC'

export interface ModeConfig {
  label: string
  tab: string
  from: string
  to: string
  absoluteZero: number
  convert: (value: number) => number
}

export const MODES: Record<ConversionMode, ModeConfig> = {
  CtoF: {
    label: 'Celsius',
    tab: '°C → °F',
    from: '°C',
    to: '°F',
    absoluteZero: -273.15,
    convert: (value) => (value * 9) / 5 + 32,
  },
  FtoC: {
    label: 'Fahrenheit',
    tab: '°F → °C',
    from: '°F',
    to: '°C',
    absoluteZero: -459.67,
    convert: (value) => ((value - 32) * 5) / 9,
  },
}

export const modeEntries = Object.entries(MODES) as [ConversionMode, ModeConfig][]
