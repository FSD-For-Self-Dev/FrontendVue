<script lang="ts">
import type { InputTypeHTMLAttribute } from "vue";
import Icon from "@/components/UI/icon/Icon.vue";
import type InputProps from "@/types/components/input";


export default {
  components: { Icon },
  inheritAttrs: false,
  props: {
    label: {
      type: String as PropType<InputProps["label"]>,
    },
    modelValue: {
      type: String as PropType<InputProps["modelValue"]>,
    },
    showLabel: {
      type: Boolean as PropType<InputProps["showLabel"]>,
      default: false,
    },
    validationError: {
      type: String as PropType<InputProps["validationError"]>,
    },
    serverError: {
      type: String as PropType<InputProps["serverError"]>,
    },
  },
  data() {
    return {
      inputType: this.$attrs.type || "text",
    } as {
      inputType: InputTypeHTMLAttribute;
    };
  },
  computed: {
    name() {
      return this.label.toLowerCase();
    },
    isDisabled() {
      return Boolean(this.$attrs.disabled);
    },
    isValid() {
      return !this.validationError && !this.serverError;
    },
    descriptionId() {
      return this.isValid ? `${this.name}-label` : `${this.name}-error`;
    },
    inputClasses() {
      return {
        "input--with-label": this.showLabel,
        "input--validation-error": this.validationError,
        "input--server-error": this.serverError,
      };
    },
    labelClasses() {
      return {
        label: this.showLabel,
        "visually-hidden": !this.showLabel,
        up: this.modelValue.length > 0,
      };
    },
  },
  methods: {
    togglePassword() {
      if (this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
    handleInput(event: InputEvent) {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
    },
  },
};
</script>

<template>
  <div class="form-row">
    <input
      v-bind="{ ...$attrs, onInput: undefined }"
      :type="inputType"
      class="input"
      :class="inputClasses"
      :id="name"
      :name="name"
      :value="modelValue"
      @input="handleInput"
      :disabled="isDisabled"
      :aria-disabled="isDisabled"
      :aria-invalid="!isValid"
      :aria-describedby="descriptionId"
    />
    <button
      v-if="$attrs.type === 'password'"
      :aria-label="inputType === 'password' ? 'Show password' : 'Hide password'"
      class="password-toggle"
      @click="togglePassword"
      type="button"
    >
    <Icon aria-hidden="true" v-if="inputType === 'password'" name="eye-on" />
    <Icon aria-hidden="true" v-else name="eye-off" />
    </button>
    <label :id="`${name}-label`" :class="labelClasses" :for="name">
      {{ label }}
    </label>
    <p v-if="validationError" :id="`${name}-error`" class="validation-error">
      {{ validationError }}
    </p>
    <p v-if="serverError" :id="`${name}-error`" class="server-error">
      {{ serverError }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.input {
    min-height: 5.9rem;
    min-width: 32rem;
    border-radius: $radius-md;
    padding-inline: 2rem;
    border: 0.1rem solid $neutrals-400;
    font-size: 1.4rem;
    line-height: 1.6rem;
    font-weight: 500;
    color: $neutrals-900;

    @include hover {
        border-color: $primary-300;
        box-shadow: 0 0 0 0.1rem $primary-300;
    }

    &:disabled {
        background-color: $neutrals-200;
        border-color: $neutrals-200;
        color: $neutrals-600;
        cursor: not-allowed;

        &+label {
            color: $neutrals-600;
        }
    }

    &:focus-visible {
        outline-offset: -0.1rem;
        outline: $primary-500 0.2rem solid;
    }

    &--with-label {
        padding-top: 1rem;
    }

    &--validation-error {
        border-color: $warning-500;
    }

    &--server-error {
        border-color: $danger-700;
    }
}

.form-row {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & input:focus+label,
    label.up {
        top: 1.2rem;
        font-size: 1.2rem;
        line-height: 1.4rem;
        color: $neutrals-600;
    }
}

.label {
    position: absolute;
    top: 1.9rem;
    left: 2rem;
    font-size: 1.4rem;
    transition: all 0.05s ease-in-out;
    color: $neutrals-900;
}

.validation-error,
.server-error {
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: $neutrals-600;
    padding-left: 2.4rem;
}

.password-toggle {
  position: absolute;
  top: 1.9rem;
  right: 4rem;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  outline: none;
  background-color: transparent;

      @include square(2.4rem);

    &:hover {
        color: $primary-500;
    }
}
</style>
