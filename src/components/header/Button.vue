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
  <button class="button" style="padding: 1rem" :class="buttonClasses">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  font-size: 2rem;
  line-height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &--icon {
    border-radius: 50%;
  }

  &--normal {
    &.button--icon {
      width: 4.4rem;
      height: 4.4rem;
    }

    &.button--text {
      padding: 1.7rem 4rem;
      border-radius: 4rem;
    }
  }

  &--small {
    &.button--icon {
      width: 3.2rem;
      height: 3.2rem;

    }

    &.button--text {
      padding: 0;
      background-color: transparent;
      cursor: pointer;
    }
  }

  &--medium {
    &.button--icon {
      width: 5.6rem;
      height: 5.6rem;
    }

    &.button--text {
      padding: 1.7rem 4rem;
      border-radius: 4rem;
    }
  }


  &--primary {
    background-color: $primary-300;
    border: 0.1rem solid transparent;
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
    border: 0.1rem solid $neutrals-400;

    @include hover {
      background-color: $primary-300;
      border: 0.1rem solid transparent;
    }

    @include active {
      background-color: $primary-400;
    }
  }
}
</style>