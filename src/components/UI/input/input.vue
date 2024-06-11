<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    validationError: {
      type: String,
    },
    serverError : {
      type: String,
    }
  },
  computed: {
    name() {
      return this.label.toLowerCase();
    },
  },
});
</script>

<template>
  <div class="form-row">
    <input
      v-bind="$attrs"
      class="input"
      :class="{ 'input--with-label': showLabel, 'input--validation-error': validationError }"
      :id="name"
      :name="name"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <label
      :class="{
        label: showLabel,
        'visually-hidden': !showLabel,
        up: modelValue.length > 0,
      }"
      :for="name"
    >
      {{ label }}
    </label>
    <p v-if="validationError" class="validation-error">{{ validationError }}</p>
    <p v-if="serverError" class="server-error">{{ serverError }}</p>
  </div>
</template>

<style lang="scss" scoped>
.input {
  height: 5.6rem;
  width: 32rem;
  border-radius: $border-radius-large;
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

    & + label {
      color: $neutrals-600;
    }
  }

  &:focus-visible {
    outline-offset: -0.1rem;
    outline: $primary-500 0.2rem solid;
  }

  &--with-label {
    padding-top: 1.25rem;
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

  & input:focus + label,
  label.up {
    top: 1.25rem;
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
</style>
