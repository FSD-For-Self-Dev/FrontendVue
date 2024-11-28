<script lang="ts">
import type { Component, PropType } from 'vue';

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
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
      <svg-icon :name="icon" size="md" color="var:neutrals-600" /> {{ text }}
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
    @include tag-big;
    color: $neutrals-600;
    display: flex;
    align-items: center;
    gap: .8rem;
  }
}
</style>
