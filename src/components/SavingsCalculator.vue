<script setup>
import { computed, ref } from 'vue'
import { DepositTiming, getSavingsFutureValue } from '../utils/financial.js'

const initialBalance = ref(1000)
const periodicDeposit = ref(100)
const periodType = ref('monthly')
const depositTiming = ref(DepositTiming.END_OF_PERIOD)
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

const depositTimingOptions = [
  {
    label: 'Al final de cada período',
    value: DepositTiming.END_OF_PERIOD,
  },
  {
    label: 'Al inicio de cada período',
    value: DepositTiming.BEGINNING_OF_PERIOD,
  },
]

const selectedPeriod = computed(() => {
  return periodOptions.find((period) => period.value === periodType.value)
})

const selectedDepositTiming = computed(() => {
  return depositTimingOptions.find((option) => option.value === depositTiming.value)
})

const paymentsPerYear = computed(() => {
  return selectedPeriod.value.paymentsPerYear
})

const totalPeriods = computed(() => {
  return years.value * paymentsPerYear.value
})

const periodicInterestRate = computed(() => {
  return annualInterestRate.value / paymentsPerYear.value
})

const futureValue = computed(() => {
  return getSavingsFutureValue(
      initialBalance.value,
      periodicDeposit.value,
      annualInterestRate.value / 100,
      paymentsPerYear.value,
      years.value,
      depositTiming.value,
  )
})
</script>

<template>
  <h1>Valor futuro de ahorros</h1>

  <form>
    <fieldset>
      <label>
        balance inicial (<span v-katex="'b_i'"></span>):
        <input
            type="number"
            step="any"
            name="initialBalance"
            v-model.number="initialBalance"
            placeholder="balance inicial, ejemplo: 1000"
        />
      </label>

      <label>
        depósito periódico (<span v-katex="'d'"></span>):
        <input
            type="number"
            step="any"
            name="periodicDeposit"
            v-model.number="periodicDeposit"
            placeholder="depósito periódico, ejemplo: 100"
        />
      </label>

      <label>
        momento del depósito:
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
        tipo de período:
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
        % tasa de interés anual (<span v-katex="'r'"></span>):
        <input
            type="number"
            step="any"
            name="annualInterestRate"
            v-model.number="annualInterestRate"
            placeholder="tasa de interés anual, ejemplo: 10"
        />
      </label>

      <label>
        duración en años:
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

  <section class="result-preview">
    <h2>Resultado</h2>

    <p>
      El valor futuro estimado del ahorro es:
    </p>

    <strong>{{ currencyFormatter.format(futureValue) }}</strong>
  </section>

  <section class="calculation-summary">
    <h2>Detalle del cálculo</h2>

    <p>
      El valor futuro del ahorro, representado como <span v-katex="'F_v'"></span>,
      se calcula combinando el crecimiento del balance inicial y el valor futuro
      de los depósitos periódicos.
    </p>

    <h3>Datos utilizados</h3>

    <ul>
      <li>
        Balance inicial:
        <span v-katex="'b_i'"></span> =
        <strong>{{ currencyFormatter.format(initialBalance) }}</strong>
      </li>

      <li>
        Depósito periódico:
        <span v-katex="'d'"></span> =
        <strong>{{ currencyFormatter.format(periodicDeposit) }}</strong>
      </li>

      <li>
        Frecuencia de depósito:
        <strong>{{ selectedPeriod.label.toLowerCase() }}</strong>
      </li>

      <li>
        Momento del depósito:
        <strong>{{ selectedDepositTiming.label.toLowerCase() }}</strong>
      </li>

      <li>
        Tasa de interés anual:
        <span v-katex="'r'"></span> =
        <strong>{{ annualInterestRate }}%</strong>
      </li>

      <li>
        Duración:
        <strong>{{ years }} años</strong>
      </li>
    </ul>

    <h3>Conversión a períodos</h3>

    <p>
      Como los depósitos se realizan de forma {{ selectedPeriod.label.toLowerCase() }},
      se consideran <strong>{{ paymentsPerYear }}</strong> pagos por año.
    </p>

    <p>
      Por lo tanto, el número total de períodos es:
    </p>

    <p class="formula">
      <span v-katex="'n = \\text{años} \\times \\text{pagos por año}'"></span>
      <br />
      <span v-katex="`n = ${years} \\times ${paymentsPerYear} = ${totalPeriods}`"></span>
    </p>

    <p>
      La tasa de interés por período es:
    </p>

    <p class="formula">
      <span v-katex="'r_p = \\frac{r}{\\text{pagos por año}}'"></span>
      <br />
      <span v-katex="`r_p = \\frac{${annualInterestRate}\\%}{${paymentsPerYear}} = ${periodicInterestRate}\\%`"></span>
    </p>

    <h3>Fórmula aplicada</h3>

    <p v-if="depositTiming === DepositTiming.BEGINNING_OF_PERIOD">
      Debido a que los depósitos se realizan al inicio de cada período, cada depósito
      tiene un período adicional para generar intereses. Por eso se multiplica la parte
      de los depósitos por <span v-katex="'(1+r_p)'"></span>.
    </p>

    <p v-else>
      Debido a que los depósitos se realizan al final de cada período, se utiliza la
      fórmula de una anualidad ordinaria.
    </p>

    <p class="formula">
      <span
          v-if="depositTiming === DepositTiming.BEGINNING_OF_PERIOD"
          v-katex="'F_v = b_i(1+r_p)^n + \\frac{d((1+r_p)^n-1)}{r_p}(1+r_p)'"
      ></span>

      <span
          v-else
          v-katex="'F_v = b_i(1+r_p)^n + \\frac{d((1+r_p)^n-1)}{r_p}'"
      ></span>
    </p>

    <p class="final-result">
      Por lo tanto, el valor futuro estimado del ahorro será:
      <strong>{{ currencyFormatter.format(futureValue) }}</strong>
    </p>
  </section>
</template>