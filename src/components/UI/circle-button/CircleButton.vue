<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { CircleButtonProps } from "@/types/components/circle-button";
import Icon from "@/components/UI/icon/Icon.vue";

export default {
  name: "CircleButton",
  components: { Icon },
  props: {
    icon: {
      type: String as PropType<CircleButtonProps["icon"]>,
    },
    size: {
      type: String as PropType<CircleButtonProps["size"]>,
      default: "normal",
    },
    variant: {
      type: String as PropType<CircleButtonProps["variant"]>,
      default: "primary",
    },
  },
  computed: {
    buttonClasses() {
      return {
        /* Sizes */
        "button--normal": this.size === "normal",
        "button--large": this.size === "large",

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
    <span class="icon">
      <Icon :name="icon" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  @include flex-center;
  background-color: $neutrals-100;
  border: 0.1rem solid transparent;
  cursor: pointer;
  box-shadow: 0px 0px 8px 0px #11111a1a;
  border-radius: $radius-full;
  color: $neutrals-700;
  align-self: center;

  &:disabled {
    cursor: not-allowed;
    background-color: $neutrals-300;
  }

  &--primary {
    @include hover {
      border-color: $primary-300;
    }

    @include active {
      border-color: $primary-500;
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $primary-500 0.2rem solid;
    }
  }

  &--secondary {
    @include hover {
      background-color: $primary-200;
      border-color: $primary-300;
    }

    @include active {
      border-color: $primary-500;
      background-color: $primary-500;
      color: $neutrals-100;
    }

    @include focus {
      outline-offset: -0.1rem;
      outline: $primary-500 0.2rem solid;
    }
  }

  &--normal {
    @include square(4.4rem);

    .icon {
      @include square(2.4rem);
    }
  }

  &--large {
    @include square(5.6rem);

    .icon {
      @include square(3rem);
    }
  }
}

</style>
