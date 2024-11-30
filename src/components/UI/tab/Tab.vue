<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tabClasses() {
      return {
        'active': this.active
      }
    }
  }
}
</script>

<template>
  <button type="button" class="tab" :class="tabClasses">{{ title }}</button>
</template>

<style lang="scss">
.tab {
  @include text-2;
  width: max-content;
  padding: 1.2rem 2.8rem;
  border-radius: $radius-2xl;
  border: .1rem solid $neutrals-400;
  background-color: transparent;
  color: $neutrals-600;
  cursor: pointer;

  &:hover {
    color: $primary-600;
    border-color: $primary-500;
  }

  &.active {
    color: $primary-600;
    border-color: $primary-500;
    background-color: $primary-100;
  }
}
</style>