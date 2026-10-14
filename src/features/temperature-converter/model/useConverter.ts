import { computed, ref } from 'vue'
import { MODES, type ConversionMode } from './modes'

export function useConverter() {
  const mode = ref<ConversionMode>('CtoF')
  const temperature = ref<number | ''>('')

  const config = computed(() => MODES[mode.value])

  const isEmpty = computed(() => temperature.value === '')

  const isBelowAbsoluteZero = computed(
    () => typeof temperature.value === 'number' && temperature.value < config.value.absoluteZero,
  )

  const result = computed<number | null>(() => {
    if (typeof temperature.value !== 'number' || !Number.isFinite(temperature.value)) {
      return null
    }

    if (isBelowAbsoluteZero.value) {
      return null
    }

    const rounded = Number(config.value.convert(temperature.value).toFixed(2))

    return rounded + 0
  })

  const resultText = computed(() =>
    result.value === null ? '—' : `${result.value} ${config.value.to}`,
  )

  const resultDescription = computed(() => {
    if (isEmpty.value) {
      return 'Enter a temperature'
    }

    if (isBelowAbsoluteZero.value) {
      return `Below absolute zero (${config.value.absoluteZero} ${config.value.from})`
    }

    if (result.value === null) {
      return 'Enter a valid temperature'
    }

    return `${temperature.value} ${config.value.from} = ${result.value} ${config.value.to}`
  })

  function setMode(newMode: ConversionMode): void {
    mode.value = newMode
    temperature.value = ''
  }

  return {
    mode,
    temperature,
    config,
    isBelowAbsoluteZero,
    resultText,
    resultDescription,
    setMode,
  }
}
