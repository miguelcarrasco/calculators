<script setup>
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/annuity-calc/">Anualidades</RouterLink>
      </li>
      <li>
        <RouterLink to="/savings-calc/">Ahorro</RouterLink>
      </li>
      <li>
        <RouterLink to="/loan-calc/">Préstamo</RouterLink>
      </li>
    </ul>
  </nav>

  <RouterView />
</template>

<style scoped>
</style>