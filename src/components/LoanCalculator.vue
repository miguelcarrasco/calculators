<script setup>
import { computed, ref } from 'vue'
import { getLoanPeriodicPayment } from '../utils/financial.js'

const loanCost = ref(100000)
const rate = ref(1)
const durationMode = ref('payments')
const periods = ref(60)
const years = ref(5)

const currencyFormatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const durationOptions = [
  {
    label: 'Número de pagos',
    value: 'payments',
  },
  {
    label: 'Número de años',
    value: 'years',
  },
]

const selectedDurationOption = computed(() => {
  return durationOptions.find((option) => option.value === durationMode.value)
})

const totalPeriods = computed(() => {
  if (durationMode.value === 'years') {
    return years.value * 12
  }

  return periods.value
})

const periodicInterestRateAsDecimal = computed(() => {
  if (durationMode.value === 'years') {
    return rate.value / 100 / 12
  }

  return rate.value / 100
})

const periodicInterestRateAsPercent = computed(() => {
  return periodicInterestRateAsDecimal.value * 100
})

const periodicPayment = computed(() => {
  return getLoanPeriodicPayment(
      loanCost.value,
      periodicInterestRateAsDecimal.value,
      totalPeriods.value,
  )
})

const totalPaid = computed(() => {
  return periodicPayment.value * totalPeriods.value
})

const totalInterest = computed(() => {
  return totalPaid.value - loanCost.value
})
</script>

<template>
  <h1>Mensualidad de préstamo</h1>

  <form>
    <fieldset>
      <label>
        costo del préstamo (<span v-katex="'C_p'"></span>):
        <input
            type="number"
            step="any"
            name="loanCost"
            v-model.number="loanCost"
            placeholder="costo del préstamo, ejemplo: 100000"
        />
      </label>

      <label>
        especificar duración por:
        <select name="durationMode" v-model="durationMode">
          <option
              v-for="option in durationOptions"
              :key="option.value"
              :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>

      <label>
        % tasa fija
        <span v-if="durationMode === 'years'">anualizada</span>
        <span v-else>por período</span>
        (<span v-katex="durationMode === 'years' ? 'r_a' : 'r_p'"></span>):
        <input
            type="number"
            step="any"
            name="rate"
            v-model.number="rate"
            :placeholder="durationMode === 'years'
              ? 'tasa fija anualizada, ejemplo: 12'
              : 'tasa fija por período, ejemplo: 1'"
        />
      </label>

      <label v-if="durationMode === 'payments'">
        número de pagos (<span v-katex="'n'"></span>):
        <input
            type="number"
            step="any"
            name="periods"
            v-model.number="periods"
            placeholder="número de pagos, ejemplo: 60"
        />
      </label>

      <label v-else>
        número de años:
        <input
            type="number"
            step="any"
            name="years"
            v-model.number="years"
            placeholder="número de años, ejemplo: 5"
        />
      </label>
    </fieldset>
  </form>

  <section class="result-preview">
    <h2>Resultado</h2>

    <p>
      La aportación periódica estimada del préstamo es:
    </p>

    <strong>{{ currencyFormatter.format(periodicPayment) }}</strong>
  </section>

  <section class="calculation-summary">
    <h2>Detalle del cálculo</h2>

    <p>
      La aportación periódica, representada como <span v-katex="'A_p'"></span>,
      indica el pago fijo que debe realizarse en cada período para liquidar un
      préstamo de costo <span v-katex="'C_p'"></span>, con tasa fija por período
      <span v-katex="'r_p'"></span>, durante <span v-katex="'n'"></span> pagos.
    </p>

    <h3>Datos utilizados</h3>

    <ul>
      <li>
        Costo del préstamo:
        <span v-katex="'C_p'"></span> =
        <strong>{{ currencyFormatter.format(loanCost) }}</strong>
      </li>

      <li>
        Duración especificada por:
        <strong>{{ selectedDurationOption.label.toLowerCase() }}</strong>
      </li>

      <li v-if="durationMode === 'years'">
        Tasa fija anualizada:
        <span v-katex="'r_a'"></span> =
        <strong>{{ rate }}%</strong>
      </li>

      <li v-else>
        Tasa fija por período:
        <span v-katex="'r_p'"></span> =
        <strong>{{ rate }}%</strong>
      </li>

      <li v-if="durationMode === 'years'">
        Número de años:
        <strong>{{ years }}</strong>
      </li>

      <li v-else>
        Número de pagos:
        <span v-katex="'n'"></span> =
        <strong>{{ periods }}</strong>
      </li>

      <li>
        Número total de pagos:
        <span v-katex="'n'"></span> =
        <strong>{{ totalPeriods }}</strong>
      </li>

      <li>
        Tasa fija por período utilizada:
        <span v-katex="'r_p'"></span> =
        <strong>{{ periodicInterestRateAsPercent }}%</strong>
      </li>
    </ul>

    <h3 v-if="durationMode === 'years'">Conversión a pagos mensuales</h3>

    <template v-if="durationMode === 'years'">
      <p>
        Como la duración se especifica en años, se asume que los pagos son mensuales.
        Por lo tanto, cada año contiene 12 pagos.
      </p>

      <p class="formula">
        <span v-katex="'n = \\text{años} \\times 12'"></span>
        <br />
        <span v-katex="`n = ${years} \\times 12 = ${totalPeriods}`"></span>
      </p>

      <p>
        La tasa anualizada se convierte a tasa mensual dividiéndola entre 12:
      </p>

      <p class="formula">
        <span v-katex="'r_p = \\frac{r_a}{12}'"></span>
        <br />
        <span v-katex="`r_p = \\frac{${rate}\\%}{12} = ${periodicInterestRateAsPercent}\\%`"></span>
      </p>
    </template>

    <h3>Fórmula aplicada</h3>

    <p v-if="periodicInterestRateAsDecimal === 0">
      Como la tasa de interés por período es cero, la aportación periódica se
      obtiene dividiendo el costo del préstamo entre el número total de pagos.
    </p>

    <p v-else>
      Para calcular la aportación periódica de un préstamo amortizado con pagos
      iguales, se usa la fórmula del pago periódico.
    </p>

    <p class="formula">
      <span
          v-if="periodicInterestRateAsDecimal === 0"
          v-katex="'A_p = \\frac{C_p}{n}'"
      ></span>

      <span
          v-else
          v-katex="'A_p = \\frac{C_p r_p}{1-(1+r_p)^{-n}}'"
      ></span>
    </p>

    <h3>Resumen del préstamo</h3>

    <ul>
      <li>
        Aportación periódica:
        <strong>{{ currencyFormatter.format(periodicPayment) }}</strong>
      </li>

      <li>
        Total pagado:
        <strong>{{ currencyFormatter.format(totalPaid) }}</strong>
      </li>

      <li>
        Interés total estimado:
        <strong>{{ currencyFormatter.format(totalInterest) }}</strong>
      </li>
    </ul>

    <p class="final-result">
      Por lo tanto, la aportación periódica estimada será:
      <strong>{{ currencyFormatter.format(periodicPayment) }}</strong>
    </p>
  </section>
</template>