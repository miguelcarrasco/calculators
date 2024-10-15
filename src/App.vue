<script setup>
import {computed, ref} from 'vue'
import {getAnnuityFutureValue} from './utils/financial.js'

const annuity = ref(1000);
const interestRate = ref(10);
const periods = ref(10);
const currencyFormatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

const futureValue = computed(() => {
  return getAnnuityFutureValue(annuity.value, interestRate.value / 100, periods.value);
})
</script>

<template>
  <h1>Valor futuro de anualidades</h1>
  <form>
    <fieldset>
      <label>
        anualidad (<span v-katex="'a'"></span>):
        <input type="number" step="any" name="annuity" v-model.number="annuity"
               placeholder="anualiadad, ejemplo: 1000"/>
      </label>
      <label>
        % tasa de interés (<span v-katex="'r_i'"></span>):
        <input type="number" step="any" name="interestRate" v-model.number="interestRate"
               placeholder="tasa de interes, ejemplo 10"/>
      </label>
      <label>
        número de periodos (<span v-katex="'n'"></span>):
        <input type="number" step="any" name="periods" v-model.number="periods" placeholder="5"/>
      </label>
    </fieldset>
  </form>
  <p>
    El valor futuro <span v-katex="'F_v'"></span>, del aporte de anualidades <span v-katex="'a'"></span>
    de valor {{ currencyFormatter.format(annuity) }}, a una tasa de interés <span v-katex="'r_i'"></span>
    de {{ interestRate }}%, compuesta en {{ periods }} periodos será de
    <span v-katex="'F_v = \\frac{a((1+r_i)^n-1)}{r_i}='"></span> {{ currencyFormatter.format(futureValue) }}
  </p>
</template>

<style scoped>
</style>