<script lang="ts">
import type { PropType } from "vue";
import type { ButtonProps } from "@/types/components/button";
import Icon from "@/components/UI/icon/Icon.vue";

export default {
  components: { Icon },
  props: {
    type: {
      type: String as PropType<ButtonProps["type"]>,
      default: "text",
    },
    icon: {
      type: String as PropType<ButtonProps["icon"]>,
    },
    size: {
      type: String as PropType<ButtonProps["size"]>,
      default: "normal",
    },
    variant: {
      type: String as PropType<ButtonProps["variant"]>,
      default: "primary",
    },
    additionalText: {
      type: String as PropType<ButtonProps["additionalText"]>,
      required: false,
    },
  },
  computed: {
    buttonClasses() {
      return {
        /* Sizes */
        "button--normal": this.size === "normal",
        "button--medium": this.size === "medium",
        "button--small": this.size === "small",

        /* Variants */
        "button--primary": this.variant === "primary",
        "button--secondary": this.variant === "secondary",
        "button--success": this.variant === "success",
        "button--danger": this.variant === "danger",
      };
    },
  },
};
</script>

<template>
  <button class="button" :class="buttonClasses">
    <span v-if="type === 'left-icon'" class="icon">
      <Icon :name="icon" />
    </span>
    <span>
      <slot />
    </span>
    <span v-if="type === 'right-icon'" class="icon">
      <Icon :name="icon" />
    </span>
    <span v-if="additionalText" class="additional">
      {{ additionalText }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  width: max-content;
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

    border-radius: $radius-md;
    column-gap: 0.8rem;
    font-size: 2rem;
    line-height: 2.4rem;
  }

  &--medium {
    @include padding(1.6, 3.2, 0.1);

    border-radius: $radius-sm;
    column-gap: 0.8rem;
    font-size: 1.6rem;
    line-height: 2rem;
  }

  &--small {
    @include padding(1.4, 2.4, 0.1);

    border-radius: $radius-xs;
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

    @include active {
      --buttonAccentColor: #{$primary-500};
      color: $neutrals-100;
    }

    &:disabled {
      --buttonAccentColor: #{$neutrals-300};
    }

    @include focus {
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

    @include active {
      border-color: $primary-500;
      box-shadow: 0 0 0 0.1rem $primary-500;
    }

    &:disabled {
      background-color: $neutrals-200;
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $secondary-900 0.2rem solid;
    }
  }

  &--danger {
    border-color: $neutrals-400;
    background-color: $neutrals-100;
    color: $danger-700;

    @include hover {
      border-color: $danger-200;
      box-shadow: 0 0 0 0.1rem $danger-200;
    }

    @include active {
      border-color: $danger-400;
      box-shadow: 0 0 0 0.1rem $danger-400;
    }

    &:disabled {
      color: $danger-700;
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $danger-400 0.2rem solid;
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

    @include active {
      border-color: $success-500;
      box-shadow: 0 0 0 0.1rem $success-500;
    }

    &:disabled {
      background-color: $neutrals-200;
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $success-900 0.2rem solid;
    }
  }
}

.additional {
  color: $neutrals-600;
}

.icon {
  @include square(2.4rem);
}
</style>