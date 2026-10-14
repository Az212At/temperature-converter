<script lang="ts" setup>
import { modeEntries } from '../model/modes'
import { useConverter } from '../model/useConverter'

const { mode, temperature, config, isBelowAbsoluteZero, resultText, resultDescription, setMode } =
  useConverter()
</script>

<template>
  <main class="converter">
    <section class="converter__card">
      <h1 class="converter__title">Temperature Converter</h1>

      <div class="converter__divider"></div>

      <div class="converter__tabs" role="group" aria-label="Conversion direction">
        <button
          v-for="[key, item] in modeEntries"
          :key="key"
          class="converter__tab"
          :class="{ 'converter__tab--active': mode === key }"
          type="button"
          :aria-pressed="mode === key"
          @click="setMode(key)"
        >
          {{ item.tab }}
        </button>
      </div>

      <div class="converter__field">
        <label class="converter__label" for="temperature">
          {{ config.label }}
        </label>

        <div class="converter__input-row">
          <input
            id="temperature"
            v-model="temperature"
            class="converter__input"
            type="number"
            step="any"
            placeholder="0"
          />

          <span class="converter__unit">{{ config.from }}</span>
        </div>
      </div>

      <div class="converter__divider"></div>

      <div class="converter__result" aria-live="polite">
        <p class="converter__result-label">Result</p>

        <p class="converter__result-value">
          {{ resultText }}
        </p>

        <p
          class="converter__result-description"
          :class="{ 'converter__result-description--error': isBelowAbsoluteZero }"
        >
          {{ resultDescription }}
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" src="./TemperatureConverter.scss"></style>
