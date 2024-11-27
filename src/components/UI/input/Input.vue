<script lang="ts">
import type { InputTypeHTMLAttribute, PropType } from "vue";
import type { InputProps } from "@/types/components/input";

export default {
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
        iconComponent: {
            type: String as PropType<InputProps["iconComponent"]>
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
        inputClasses() {
            return {
                "input--with-label": this.showLabel,
                "input--validation-error": this.validationError,
                "input--server-error": this.serverError,
            };
        },
        labelClasses() {
            if (this.modelValue) {
                return {
                    label: this.showLabel,
                    "visually-hidden": !this.showLabel,
                    up: this.modelValue.length > 0,
                };
            } else {
                return {
                    label: this.showLabel,
                    "visually-hidden": !this.showLabel,
                    up: false
                };
            }
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
        <input v-bind="{ ...$attrs, onInput: undefined }" :type="inputType" class="input" :class="inputClasses"
            :id="name" :name="name" :value="modelValue" @input="handleInput" :disabled="isDisabled"
            :aria-disabled="isDisabled" :aria-invalid="!isValid" :aria-describedby="descriptionId" />
        <button v-if="$attrs.type === 'password'"
            :aria-label="inputType === 'password' ? 'Show password' : 'Hide password'" class="password-toggle"
            @click="togglePassword" type="button">
            <svg-icon name="EyeOnIcon" size="md" v-if="inputType === 'password'" />
            <svg-icon name="EyeOffIcon" size="md" v-else />
        </button>
        <label :id="`${name}-label`" :class="labelClasses" :for="name">
            {{ label }}
        </label>
        <span v-if="validationError" :id="`${name}-error`" class="validation-error">
            {{ validationError }}
        </span>
        <span v-if="serverError" :id="`${name}-error`" class="server-error">
            {{ serverError }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
.input {
    min-height: 5.6rem;
    min-width: 100%;
    border-radius: $radius-2xl;
    padding-inline: 2.8rem;
    border: 0.1rem solid $neutrals-400;
    @include text-2;
    color: $neutrals-900;

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
        @include text-4;
        color: $neutrals-600;
    }
}

.label {
    position: absolute;
    top: 1.9rem;
    left: 2rem;
    @include text-3;
    color: $neutrals-600;
    transition: all 0.05s ease-in-out;
}

.validation-error,
.server-error {
    @include text-3;
    color: $neutrals-600;
    padding-left: 2.4rem;
}

.password-toggle {
    position: absolute;
    top: 1.6rem;
    right: 2.8rem;
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
