<script lang="ts">
import type { HeaderButtonProps } from '@/types/components/header-button';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    size: {
      type: String as PropType<HeaderButtonProps['size']>,
      default: "normal"
    },
    variant: {
      type: String as PropType<HeaderButtonProps['variant']>,
      default: "primary"
    },
    view: {
      type: String as PropType<HeaderButtonProps['view']>,
      default: "text"
    },
  },
  computed: {
    buttonClasses() {
      return {
        "button--normal": this.size === "normal",
        "button--medium": this.size === "medium",
        "button--small": this.size === "small",

        "button--primary": this.variant === "primary",
        "button--secondary": this.variant === "secondary",

        "button--text": this.view === "text",
        "button--icon": this.view === "icon",
      }
    }
  }
})
</script>

<template>
  <button class="button" :class="buttonClasses">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &--icon {
    border-radius: 50%;
  }

  &--normal {
    &.button--icon {
      width: 44px;
      height: 44px;
    }

    &.button--text {
      padding: 17px 40px;
      border-radius: 40px;
    }
  }

  &--small  {
    &.button--icon {
      width: 32px;
      height: 32px;
    }
    
    &.button--text {
      padding: 0;
      background-color: transparent;
      cursor: pointer;
    }
  }

  &--primary {
    background-color: $primary-300;
    border: 1px solid transparent;
    color: #272932;

    @include hover {
      background-color: $primary-600;
    }

    @include active {
      background-color: $primary-700;
    }
  }
  
  &--secondary {
    background-color: $neutrals-100;
    border: 1px solid $neutrals-400;

    @include hover {
      background-color: $primary-300;
      border: 1px solid transparent;
    }

    @include active {
      background-color: $primary-400;
    }
  }
}
</style>