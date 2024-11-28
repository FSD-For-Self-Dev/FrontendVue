<script lang="ts">
import type { Component, PropType } from 'vue';

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: Object as PropType<Component>,
      required: true
    },
    settingsPage: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <header class="header-page" :class="{ 'settings-page': settingsPage }">
    <h2 class="header-page--title">
      <component :is="icon" size="20" /> {{ text }}
    </h2>
  </header>
</template>

<style lang="scss">
.header-page {
  display: flex;
  align-items: center;


  &.settings-page {
    position: fixed;
  }

  &--title {
    font-family: 'Inter';
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 2rem;
    color: $neutrals-600;
    text-transform: uppercase;

    display: flex;
    align-items: center;
    gap: .8rem;
  }
}
</style>
