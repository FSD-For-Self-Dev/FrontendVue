<script lang="ts">
import type { PropType } from "vue";
import type { BooleanInputProps } from "@/types/components/boolean-input";

export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String as PropType<BooleanInputProps["label"]>,
      required: true,
    },
    type: {
      type: String as PropType<BooleanInputProps["type"]>,
      default: "checkbox",
    },
    size: {
      type: String as PropType<BooleanInputProps["size"]>,
      default: "small",
    },
  },
  computed: {
    wrapperClasses() {
      return {
        /* Sizes */
        "boolean-input--medium": this.size === "medium",
        "boolean-input--small": this.size === "small",

        /* Types */
        "boolean-input--checkbox": this.type === "checkbox",
        "boolean-input--toggle": this.type === "toggle",
        "boolean-input--radio": this.type === "radio",
      };
    },
    inputClasses() {
      return {
        "active": Boolean(this.$attrs.active),
      };
    },
    isDisabled() {
      return Boolean(this.$attrs.disabled);
    },
  },
};
</script>

<template>
  <div class="boolean-input" :class="wrapperClasses">
    <input
      class="boolean-input--input" :class="inputClasses"
      id="booleaninput"
      :type="type === 'toggle' ? 'checkbox' : type"
      v-bind="{ ...$attrs, onInput: undefined }"
      :disabled="isDisabled" :aria-disabled="isDisabled"
    />
    <label class="boolean-input--label" for="booleaninput">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.boolean-input {
  &--medium {
    @include text-2;
    height: max-content;
    
    .boolean-input--label {
      gap: 0.8rem;

      &::before {
        min-width: 2.4rem;
        min-height: 2.4rem;
        width: max-content;
        height: max-content;
      }
    }
  }

  &--small {
    @include text-3;
    height: max-content;
    
    .boolean-input--label {
      gap: 0.8rem;

      &::before {
        min-width: 2rem;
        min-height: 2rem;
        width: max-content;
        height: max-content;
      }
    }
  }
  
  display: inline-flex;
  align-items: center;
  width: max-content;
  cursor: pointer;

  &--checkbox {
    .boolean-input--input {
      // Hide default checkbox
      display: none;

      // Style custom checkbox checked, hover, active states
      &:checked+.boolean-input--label::before {
        border-color: $primary-500;
        background-color: $primary-500;
        background-image: url("../../../assets/svg-icons/tick.svg");
      }

      &:hover+.boolean-input--label::before {
        border-color: $primary-400;
        background-color: $primary-400;
        background-image: url("../../../assets/svg-icons/tick.svg");
      }

      &:active+.boolean-input--label::before {
        border-color: $primary-500;
        background-color: $primary-500;
        background-image: url("../../../assets/svg-icons/tick.svg");
      }

      &:not(.active):disabled+.boolean-input--label::before {
        cursor: not-allowed;
        border-color: $neutrals-400;
        background-color: $neutrals-200;
      }

      &.active:disabled+.boolean-input--label::before {
        border-color: $neutrals-400;
        background-color: $neutrals-400;
        background-image: url("../../../assets/svg-icons/tick.svg");
      }

      &:disabled+.boolean-input--label {
        cursor: not-allowed;
      }
    }

    .boolean-input--label {
      cursor: pointer;
      color: $neutrals-900;
      display: inline-flex;
      align-items: center;

      // Style custom checkbox default state
      &::before {
        content: '';
        display: inline-block;
        border: 0.1rem solid $neutrals-500;
        border-radius: 0.6rem;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }

  &--radio {
    .boolean-input--input {
      // Hide default checkbox
      display: none;

      // Style custom checkbox checked, hover, active states
      &:checked+.boolean-input--label::before {
        border-width: 0.6rem;
        border-color: $primary-500;
        background-color: $neutrals-100;
      }

      &:hover+.boolean-input--label::before {
        border-width: 0.6rem;
        border-color: $primary-400;
        background-color: $neutrals-100;
      }

      &:active+.boolean-input--label::before {
        border-width: 0.6rem;
        border-color: $primary-500;
        background-color: $neutrals-100;
      }

      &:not(.active):disabled+.boolean-input--label::before {
        cursor: not-allowed;
        border-width: 0.1rem;
        border-color: $neutrals-400;
        background-color: $neutrals-200;
      }

      &.active:disabled+.boolean-input--label::before {
        cursor: not-allowed;
        border-width: 0.6rem;
        border-color: $neutrals-300;
        background-color: $neutrals-500;
      }

      &:disabled+.boolean-input--label {
        cursor: not-allowed;
      }
    }

    .boolean-input--label {
      cursor: pointer;
      color: $neutrals-900;
      display: inline-flex;
      align-items: center;

      // Style custom checkbox default state
      &::before {
        content: '';
        display: inline-block;
        border: 0.1rem solid $neutrals-500;
        border-radius: 6rem;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }

  &--toggle {
    .boolean-input--input {
      // Hide default checkbox
      display: none;

      // Style custom checkbox checked, hover, active states
      &:checked+.boolean-input--label::before {
        content: '✔';
        border-color: $primary-500;
        background-color: $primary-500;
        background-position: 88% center;
        background-image: url("../../../assets/svg-icons/circle.svg");
      }

      &:hover+.boolean-input--label::before {
        content: '✔';
        border-color: $primary-400;
        background-color: $primary-400;
        background-image: url("../../../assets/svg-icons/circle.svg");
      }

      &:active+.boolean-input--label::before {
        content: '✔';
        border-color: $primary-500;
        background-color: $primary-500;
        background-image: url("../../../assets/svg-icons/circle.svg");
      }

      &:not(.active):disabled+.boolean-input--label::before {
        cursor: not-allowed;
        content: '✔';
        border-color: $neutrals-400;
        background-color: $neutrals-400;
        background-image: url("../../../assets/svg-icons/circle.svg");
      }

      &.active:disabled+.boolean-input--label::before {
        cursor: not-allowed;
        content: '✔';
        border-color: $neutrals-400;
        background-color: $neutrals-400;
        background-position: 88% center;
        background-image: url("../../../assets/svg-icons/circle.svg");
      }

      &:disabled+.boolean-input--label {
        cursor: not-allowed;
      }
    }

    .boolean-input--label {
      cursor: pointer;
      color: $neutrals-900;
      display: inline-flex;
      align-items: center;

      // Style custom checkbox default state
      &::before {
        content: '✔';
        color: transparent;
        display: flex;
        border: 0.1rem solid $neutrals-500;
        border-radius: 6rem;
        background-repeat: no-repeat;
        background-position: 12% center;
        padding-left: 2.8rem;
        padding-block: 0.2rem;
        background-color: $neutrals-500;
        background-image: url("../../../assets/svg-icons/circle.svg");
      }
    }
  }
}
</style>
