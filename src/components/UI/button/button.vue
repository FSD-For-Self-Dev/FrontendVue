<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    type: {
      type: String as PropType<"text" | "left-icon" | "right-icon">,
      required: true,
    },
    icon: {
      type: String as PropType<"pen" | "add">,
      required: false,
    },
    size: {
      type: String as PropType<"normal" | "medium" | "small" | "medium-long">,
      default: "normal" as const,
    },
    variant: {
      type: String as PropType<"primary" | "secondary" | "success" | "danger">,
      default: "primary" as const,
    },
    additionalText: {
      type: String,
      required: false,
    },
  },
});
</script>

<template>
  <button
    v-bind="$attrs"
    class="button"
    :class="{
      /* Sizes */
      'button--normal': size === 'normal',
      'button--medium': size === 'medium',
      'button--small': size === 'small',
      'button--medium-long': size === 'medium-long',

      /* Variants */
      'button--primary': variant === 'primary',
      'button--secondary': variant === 'secondary',
      'button--success': variant === 'success',
      'button--danger': variant === 'danger',
    }"
  >
    <span v-if="type === 'left-icon'" class="left">
      <span>{{ icon }}</span>
    </span>
    <span>
      <slot />
    </span>
    <span v-if="type === 'right-icon'" class="right">
      <span>{{ icon }}</span>
    </span>
    <span v-if="additionalText" class="additional">
      <span>{{ additionalText }}</span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  border: 0.1rem solid transparent;
  align-items: center;
  text-decoration: none;
  font-weight: 400;

  &:disabled {
    cursor: not-allowed;
    color: $neutrals-600;
  }

  &--normal {
    @include padding(2, 3.2, 0.1);

    border-radius: $border-radius-large;
    column-gap: 0.8rem;
    font-size: 2rem;
    line-height: 2.4rem;
  }

  &--medium {
    @include padding(1.6, 3.2, 0.1);

    border-radius: $border-radius-medium;
    column-gap: 0.8rem;
    font-size: 1.6rem;
    line-height: 2rem;
  }

  &--medium-long {
    @include padding(1.8, 2.4, 0.1);

    border-radius: $border-radius-large;
    column-gap: 0.8rem;
    font-size: 1.6rem;
    line-height: 2rem;
  }

  &--small {
    @include padding(1.4, 2.4, 0.1);

    border-radius: $border-radius-small;
    column-gap: 0.6rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
  }

  &--primary {
    --buttonAccentColor: #{$primary-400};
    background-color: var(--buttonAccentColor);
    border-color: var(--buttonAccentColor);
    color: $neutrals-900;

    @include hover {
      --buttonAccentColor: #{$primary-300};
    }

    &:active {
      --buttonAccentColor: #{$primary-500};
      color: $text-white;
    }

    &:disabled {
      --buttonAccentColor: #{$neutrals-300};
    }

    &:focus-visible {
      outline-offset: -0.1rem;
      outline: $primary-900 0.2rem solid;
    }
  }

  &--secondary {
    border-color: $neutrals-400;
    background-color: $neutrals-100;
    color: $neutrals-900;

    @include hover {
      border-color: $primary-300;
      box-shadow: 0 0 0 0.1rem $primary-300;
    }

    &:active {
      border-color: $primary-500;
      box-shadow: 0 0 0 0.1rem $primary-500;
    }

    &:disabled {
      background-color: $neutrals-200;
    }

    &:focus-visible {
      outline-offset: -0.1rem;
      outline: $secondary-900 0.2rem solid;
    }
  }

  &--danger {
    border-color: $neutrals-400;
    background-color: $background-white;
    color: $danger-700;

    @include hover {
      border-color: $danger-200;
      box-shadow: 0 0 0 0.1rem $danger-200;
    }

    &:active {
      border-color: $danger-400;
      box-shadow: 0 0 0 0.1rem $danger-400;
    }

    &:disabled {
      color: $danger-700;
    }

    &:focus-visible {
      outline-offset: -0.1rem;
      outline: $danger-400 -0.2rem solid;
    }
  }

  &--success {
    border-color: $primary-400;
    background-color: $success-300;
    color: $neutrals-900;

    @include hover {
      border-color: $success-700;
      box-shadow: 0 0 0 0.1rem $success-700;
    }

    &:active {
      border-color: $success-500;
      box-shadow: 0 0 0 0.1rem $success-500;
    }

    &:disabled {
      background-color: $neutrals-200;
    }

    &:focus-visible {
      outline-offset: -0.1rem;
      outline: $success-900 -0.2rem solid;
    }
  }
}

.additional {
  color: red;
}
</style>
