<script lang="ts">

export default {
  props: {
    clearActiveItems: {
      type: Function,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
};
</script>

<template>
    <div class="counter" @click="() => clearActiveItems()">
      <svg-icon name="CloseIcon" size="sm" color="var:$neutrals-700" class="icon" />
      {{ value }}
    </div>
</template>

<style lang="scss">
.counter {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  @include text-2;
  color: $neutrals-700;
  padding: 0.8rem 1.6rem;
  border-radius: $radius-2xl;
  outline: 0.1rem solid $neutrals-400;
  cursor: pointer;

  @include hover {
    background-color: $primary-100;
    outline-color: $primary-400;
    color: $primary-600;

    .icon {
      color: $primary-600;
    }
  }

  @include active {
    background-color: $primary-200;
    outline-color: $primary-500;
    color: $primary-700;

    .icon {
      color: $primary-700;
    }
  }
}
</style>
