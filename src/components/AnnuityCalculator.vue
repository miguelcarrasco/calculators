<script setup>
import { computed, ref } from 'vue'
import { DepositTiming, getAnnuityFutureValue } from '../utils/financial.js'

const annuity = ref(1000)
const interestRate = ref(10)
const periods = ref(10)
const depositTiming = ref(DepositTiming.END_OF_PERIOD)
const currencyFormatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const depositTimingOptions = [
  {
    label: 'Ordinaria: al final de cada período',
    value: DepositTiming.END_OF_PERIOD,
  },
  {
    label: 'Anticipada: al inicio de cada período',
    value: DepositTiming.BEGINNING_OF_PERIOD,
  },
]

const selectedDepositTiming = computed(() => {
  return depositTimingOptions.find((option) => option.value === depositTiming.value)
})

const futureValue = computed(() => {
  return getAnnuityFutureValue(
      annuity.value,
      interestRate.value / 100,
      periods.value,
      depositTiming.value,
  )
})
</script>

<template>
  <h1>Valor futuro de anualidades</h1>
  <form>
    <fieldset>
      <label>
        anualidad (<span v-katex="'a'"></span>):
        <input
            type="number"
            step="any"
            name="annuity"
            v-model.number="annuity"
            placeholder="anualiadad, ejemplo: 1000"
        />
      </label>

      <label>
        tipo de anualidad:
        <select name="depositTiming" v-model="depositTiming">
          <option
              v-for="option in depositTimingOptions"
              :key="option.value"
              :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>

      <label>
        % tasa de interés (<span v-katex="'r_i'"></span>):
        <input
            type="number"
            step="any"
            name="interestRate"
            v-model.number="interestRate"
            placeholder="tasa de interes, ejemplo 10"
        />
      </label>

      <label>
        número de periodos (<span v-katex="'n'"></span>):
        <input
            type="number"
            step="any"
            name="periods"
            v-model.number="periods"
            placeholder="5"
        />
      </label>
    </fieldset>
  </form>

  <p>
    El valor futuro <span v-katex="'F_v'"></span>, del aporte de anualidades <span v-katex="'a'"></span>
    de valor {{ currencyFormatter.format(annuity) }}, de tipo {{ selectedDepositTiming.label.toLowerCase() }},
    a una tasa de interés <span v-katex="'r_i'"></span>
    de {{ interestRate }}%, durante {{ periods }} periodos será de
    <span
        v-if="depositTiming === DepositTiming.BEGINNING_OF_PERIOD"
        v-katex="'F_v = \\frac{a((1+r_i)^n-1)}{r_i}(1+r_i)='"
    ></span>
    <span
        v-else
        v-katex="'F_v = \\frac{a((1+r_i)^n-1)}{r_i}='"
    ></span>
    <strong>{{ currencyFormatter.format(futureValue) }}</strong>
  </p>
</template>

<style scoped>
</style>