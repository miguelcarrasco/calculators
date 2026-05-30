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

  <section class="result-preview">
    <h2>Resultado</h2>

    <p>
      El valor futuro estimado de la anualidad es:
    </p>

    <strong>{{ currencyFormatter.format(futureValue) }}</strong>
  </section>

  <section class="calculation-summary">
    <h2>Detalle del cálculo</h2>

    <p>
      El valor futuro de una anualidad, representado como <span v-katex="'F_v'"></span>,
      indica cuánto valdrá una serie de aportes iguales después de acumular intereses
      durante un número determinado de períodos.
    </p>

    <h3>Datos utilizados</h3>

    <ul>
      <li>
        Aporte periódico o anualidad:
        <span v-katex="'a'"></span> =
        <strong>{{ currencyFormatter.format(annuity) }}</strong>
      </li>

      <li>
        Tipo de anualidad:
        <strong>{{ selectedDepositTiming.label.toLowerCase() }}</strong>
      </li>

      <li>
        Tasa de interés por período:
        <span v-katex="'r_i'"></span> =
        <strong>{{ interestRate }}%</strong>
      </li>

      <li>
        Número de períodos:
        <span v-katex="'n'"></span> =
        <strong>{{ periods }}</strong>
      </li>
    </ul>

    <h3>Interpretación del tipo de anualidad</h3>

    <p v-if="depositTiming === DepositTiming.BEGINNING_OF_PERIOD">
      Esta es una anualidad anticipada, porque cada aporte se realiza al inicio
      de cada período. Como resultado, cada aporte tiene un período adicional para
      generar intereses.
    </p>

    <p v-else>
      Esta es una anualidad ordinaria, porque cada aporte se realiza al final
      de cada período. En este caso, los aportes empiezan a generar intereses
      después de ser depositados.
    </p>

    <h3>Fórmula aplicada</h3>

    <p v-if="depositTiming === DepositTiming.BEGINNING_OF_PERIOD">
      Para una anualidad anticipada, primero se calcula el valor futuro de una
      anualidad ordinaria y luego se multiplica por
      <span v-katex="'(1+r_i)'"></span>, ya que los aportes se hacen al inicio
      del período.
    </p>

    <p v-else>
      Para una anualidad ordinaria, se usa directamente la fórmula del valor
      futuro de una serie de pagos iguales al final de cada período.
    </p>

    <p class="formula">
      <span
          v-if="depositTiming === DepositTiming.BEGINNING_OF_PERIOD"
          v-katex="'F_v = \\frac{a((1+r_i)^n-1)}{r_i}(1+r_i)'"
      ></span>

      <span
          v-else
          v-katex="'F_v = \\frac{a((1+r_i)^n-1)}{r_i}'"
      ></span>
    </p>

    <p class="final-result">
      Por lo tanto, el valor futuro estimado de la anualidad será:
      <strong>{{ currencyFormatter.format(futureValue) }}</strong>
    </p>
  </section>
</template>