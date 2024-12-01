<script lang="ts">
import type { PropType } from "vue";
import type { ButtonProps } from "@/types/components/button";

export default {
  props: {
    text: {
      type: String as PropType<ButtonProps["text"]>,
      required: false,
    },
    size: {
      type: String as PropType<ButtonProps["size"]>,
      default: "normal",
    },
    variant: {
      type: String as PropType<ButtonProps["variant"]>,
      default: "primary",
    },
    icon: {
      type: String as PropType<ButtonProps["icon"]>,
      required: false,
    },
    iconPos: {
      type: String as PropType<ButtonProps["iconPos"]>,
      default: "left",
    },
    additionalLabel: {
      type: String as PropType<ButtonProps["additionalLabel"]>,
      required: false,
    },
    additionalIcon: {
      type: String as PropType<ButtonProps["additionalIcon"]>,
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
    iconSizes() {
      return {
        "normal": "lg",
        "medium": "md",
        "small": "sm",
      };
    },
  },
};
</script>

<template>
  <button class="button" :class="buttonClasses">
    <svg-icon v-if="icon && iconPos === 'left'" v-bind:name="icon" :size="iconSizes[size]" class="icon" />
    <svg-icon v-if="additionalIcon && iconPos === 'right'" v-bind:name="additionalIcon" :size="iconSizes[size]"
      class="icon" />

    <span v-if="text" style="float: left; text-align: left;">
      {{ text }}
    </span>
    <span v-if="additionalLabel" class="additional">
      {{ additionalLabel }}
    </span>

    <svg-icon v-if="icon && iconPos === 'right'" v-bind:name="icon" :size="iconSizes[size]" class="icon" />
    <svg-icon v-if="additionalIcon && iconPos === 'left'" v-bind:name="additionalIcon" :size="iconSizes[size]"
      class="icon" />
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  width: max-content;
  min-width: 16rem;
  align-items: center;
  justify-content: center;
  outline: 0.1rem solid transparent;
  text-decoration: none;

  .icon {
    stroke-width: 0.02rem;
    transition: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: $neutrals-600;

    .icon {
      color: $neutrals-600;
    }
  }

  &--normal {
    @include text-1;
    height: 6.4rem;
    padding: 2rem 3.2rem;
    border-radius: $radius-md;
    column-gap: 0.8rem;
  }

  &--medium {
    @include text-2;
    height: 5.6rem;
    padding: 1.6rem 3.2rem;
    border-radius: $radius-xs;
    column-gap: 0.8rem;
  }

  &--small {
    @include text-3;
    height: 4.4rem;
    padding: 1.4rem 2.4rem;
    border-radius: $radius-xs;
    column-gap: 0.6rem;
  }

  &--extra-small {
    @include text-4;
    height: 3.6rem;
    padding: 1rem 2.4rem;
    border-radius: $radius-xs;
    column-gap: 0.6rem;
  }

  &--primary {
    --buttonAccentColor: #{$primary-400};
    background-color: var(--buttonAccentColor);
    outline-color: var(--buttonAccentColor);
    color: $neutrals-900;

    @include hover {
      --buttonAccentColor: #{$primary-300};
    }

    @include active {
      --buttonAccentColor: #{$primary-500};
      color: $neutrals-100;

      .icon {
        color: $neutrals-100;
      }
    }

    &:disabled {
      --buttonAccentColor: #{$neutrals-300};
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $primary-900 0.1rem solid;
    }
  }

  &--secondary {
    outline-color: $neutrals-400;
    background-color: $neutrals-100;
    color: $neutrals-900;

    @include hover {
      outline-color: $primary-300;
    }

    @include active {
      outline-color: $primary-500;
    }

    &:disabled {
      background-color: $neutrals-200;
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $secondary-900 0.1rem solid;
    }
  }

  &--danger {
    background-color: $neutrals-100;
    color: $danger-700;
    outline-color: $danger-200;

    .icon {
      color: $danger-700;
    }

    @include hover {
      outline-color: $danger-300;
    }

    @include active {
      outline-color: $danger-400;
    }

    &:disabled {
      color: $danger-700;
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $danger-400 0.1rem solid;
    }
  }

  &--success {
    outline-color: $primary-400;
    background-color: $success-300;
    color: $neutrals-900;

    @include hover {
      outline-color: $success-700;
    }

    @include active {
      outline-color: $success-500;
    }

    &:disabled {
      background-color: $neutrals-200;
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $success-900 0.1rem solid;
    }
  }
}

.additional {
  color: $neutrals-600;
}

.icon {
  display: flex;
  align-items: center;
}
</style>
