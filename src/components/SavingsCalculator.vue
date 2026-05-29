<script setup>
import { computed, ref } from 'vue'
import { getSavingsFutureValue } from '../utils/financial.js'

const initialBalance = ref(1000)
const periodicDeposit = ref(100)
const periodType = ref('monthly')
const annualInterestRate = ref(10)
const years = ref(10)

const currencyFormatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const periodOptions = [
  {
    label: 'Semanal',
    value: 'weekly',
    paymentsPerYear: 52,
  },
  {
    label: 'Quincenal',
    value: 'biweekly',
    paymentsPerYear: 24,
  },
  {
    label: 'Mensual',
    value: 'monthly',
    paymentsPerYear: 12,
  },
  {
    label: 'Anual',
    value: 'yearly',
    paymentsPerYear: 1,
  },
]

const selectedPeriod = computed(() => {
  return periodOptions.find((period) => period.value === periodType.value)
})

const paymentsPerYear = computed(() => {
  return selectedPeriod.value.paymentsPerYear
})

const futureValue = computed(() => {
  return getSavingsFutureValue(
      initialBalance.value,
      periodicDeposit.value,
      annualInterestRate.value / 100,
      paymentsPerYear.value,
      years.value,
  )
})
</script>

<template>
  <h1>Valor futuro de ahorro</h1>

  <form>
    <fieldset>
      <label>
        Balance inicial:
        <input
            type="number"
            step="any"
            name="initialBalance"
            v-model.number="initialBalance"
            placeholder="balance inicial, ejemplo: 1000"
        />
      </label>

      <label>
        Depósitos periódicos:
        <input
            type="number"
            step="any"
            name="periodicDeposit"
            v-model.number="periodicDeposit"
            placeholder="depósito periódico, ejemplo: 100"
        />
      </label>

      <label>
        Tipo de período:
        <select name="periodType" v-model="periodType">
          <option
              v-for="period in periodOptions"
              :key="period.value"
              :value="period.value"
          >
            {{ period.label }}
          </option>
        </select>
      </label>

      <label>
        % tasa de interés anual:
        <input
            type="number"
            step="any"
            name="annualInterestRate"
            v-model.number="annualInterestRate"
            placeholder="tasa de interés anual, ejemplo: 10"
        />
      </label>

      <label>
        Duración en años:
        <input
            type="number"
            step="any"
            name="years"
            v-model.number="years"
            placeholder="duración en años, ejemplo: 10"
        />
      </label>
    </fieldset>
  </form>

  <p>
    El valor futuro del ahorro con un balance inicial de
    {{ currencyFormatter.format(initialBalance) }}, depósitos periódicos de
    {{ currencyFormatter.format(periodicDeposit) }} de forma {{ selectedPeriod.label.toLowerCase() }},
    a una tasa de interés anual de {{ annualInterestRate }}% durante {{ years }} años será de
    <strong>{{ currencyFormatter.format(futureValue) }}</strong>.
  </p>
</template>

<style scoped>
</style>