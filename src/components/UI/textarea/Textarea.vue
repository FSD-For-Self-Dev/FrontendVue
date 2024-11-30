<script lang="ts">
import type { TextareaProps } from "@/types/components/textarea";
import type { PropType } from "vue";

export default {
  props: {
    label: {
      type: String as PropType<TextareaProps["label"]>,
    },
    modelValue: {
      type: String as PropType<TextareaProps["modelValue"]>,
    },
    showLabel: {
      type: Boolean as PropType<TextareaProps["showLabel"]>,
      default: false,
    },
    validationError: {
      type: String as PropType<TextareaProps["validationError"]>,
    },
    serverError: {
      type: String as PropType<TextareaProps["serverError"]>,
    },
  },
  methods: {
    handleInput(event: InputEvent) {
      this.$emit(
        "update:modelValue",
        (event.target as HTMLTextAreaElement).value
      );
    },
  },
  computed: {
    name() {
      return this.label?.toLowerCase() ?? '';
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
    textareaClasses() {
      return {
        "textarea--with-label": this.showLabel,
        "textarea--validation-error": this.validationError,
        "textarea--server-error": this.serverError,
      };
    },
    labelClasses() {
      if (this.modelValue) {
        return {
            label: this.showLabel,
            "visually-hidden": !this.showLabel,
            up: true,
        };
      } else {
          return {
              label: this.showLabel,
              "visually-hidden": !this.showLabel,
              up: false,
          };
      }
    },
  },
};
</script>

<template>
  <div class="form-row">
    <textarea v-bind="{ ...$attrs, onInput: undefined }" class="textarea" :class="textareaClasses" :id="name"
      :name="name" :value="modelValue" @input="handleInput" :disabled="isDisabled" :aria-disabled="isDisabled"
      :aria-invalid="!isValid" :aria-describedby="descriptionId" rows="4" />
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
.textarea {
  min-height: 5.6rem;
  min-width: 32rem;
  border-radius: $radius-md;
  padding-block: 1.6rem;
  padding-inline: 2rem;
  border: 0.1rem solid $neutrals-400;
  @include text-2;
  color: $neutrals-900;
  resize: vertical;

  @include hover {
    border-color: $primary-300;
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
    outline: $primary-500 0.1rem solid;
  }

  &--with-label {
    padding-top: 2.4rem;
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

  & textarea:focus+label,
  label.up {
    top: -1.2rem;
    @include text-3;
    color: $neutrals-600;
    background-color: $neutrals-100;
    padding-inline: 0.8rem;
    border-radius: $radius-xs;
    padding-block: 0.4rem;
    margin-left: -0.4rem;
  }
}

.label {
  @include text-2;
  position: absolute;
  top: 1.8rem;
  left: 2.8rem;
  color: $neutrals-600;
  transition: all 0.05s ease-in-out;
}

.validation-error,
.server-error {
  @include text-3;
  color: $neutrals-600;
  padding-left: 2.4rem;
}
</style>
