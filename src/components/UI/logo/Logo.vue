<script lang="ts">
export default {}
</script>

<template>
  <a class="logo" href="/">
    <img class="logo" src="../../../../public/logo.svg" alt="logo" />
    <div class="logo-name">
      <h3 class="logo-title">Linguista</h3>
      <p class="logo-subtitle text">Control & Repeat</p>
    </div>
  </a>
</template>

<style scoped lang="scss">
.text {
  color: $neutrals-700;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-name {
  margin: 0 1.5rem;
}

.logo-title {
  font-family: 'Fredoka';
  font-size: 2.4rem;
}

.logo-subtitle {
  font-size: 1.4rem;
}
</style>
