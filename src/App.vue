<script setup>
</script>

<template>
  <h1>Valor futuro de anualidades</h1>
  <form id="annuityForm">
    <fieldset>
      <label>
        anualidad (<span v-katex="'a'"></span>):
        <input type="number" step="any" id="annuity" name="annuity" value="1000"
               placeholder="anualiadad, ejemplo: 1000"/>
      </label>
      <label>
        % tasa de interés (<span v-katex="'r_i'"></span>):
        <input type="number" step="any" id="interestRate" name="ri" value="10"
               placeholder="tasa de interes, ejemplo 10"/>
      </label>
      <label>
        número de periodos (<span v-katex="'n'"></span>):
        <input type="number" step="any" id="periods" name="periods" value="5" placeholder="5"/>
      </label>
    </fieldset>
    <input type="submit" value="calcular"/>
  </form>
  <p>
  <div id="result"></div>
  </p>
</template>

<style scoped>
</style>