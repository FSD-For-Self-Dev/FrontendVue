<script lang="ts">
import type { InputTypeHTMLAttribute, PropType } from "vue";
import type { InputProps } from "@/types/components/input";

export default {
    inheritAttrs: false,
    props: {
        label: {
            type: String as PropType<InputProps["label"]>,
        },
        placeholder: {
            type: String as PropType<InputProps["placeholder"]>,
        },
        showLabel: {
            type: Boolean as PropType<InputProps["showLabel"]>,
            default: false,
        },
        modelValue: {
            type: String as PropType<InputProps["modelValue"]>,
        },
        validationError: {
            type: String as PropType<InputProps["validationError"]>,
        },
        serverError: {
            type: String as PropType<InputProps["serverError"]>,
        },
        icon: {
            type: String as PropType<InputProps["icon"]>
        },
        iconPos: {
            type: String as PropType<InputProps["iconPos"]>,
            default: "left"
        },
        size: {
            type: String as PropType<InputProps["size"]>,
            default: "standart"
        },
        additionalIcon: {
            type: String as PropType<InputProps["additionalIcon"]>,
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
                "input--with-icon-left": this.icon && this.iconPos === "left",
                "input--with-icon-right": this.icon && this.iconPos === "right",
                "input--with-label": this.showLabel,
                "input--validation-error": this.validationError,
                "input--server-error": this.serverError,
                "input--standart": this.size === "standart",
                "input--big": this.size === "big",
            };
        },
        labelClasses() {
            if (this.modelValue || this.placeholder) {
                return {
                    label: this.showLabel,
                    "visually-hidden": !this.showLabel,
                    up: true,
                    "label--with-icon-left": this.icon && this.iconPos === "left",
                    "label--with-icon-right": this.icon && this.iconPos === "right",
                };
            } else {
                return {
                    label: this.showLabel,
                    "visually-hidden": !this.showLabel,
                    up: false,
                    "label--with-icon-left": this.icon && this.iconPos === "left",
                    "label--with-icon-right": this.icon && this.iconPos === "right",
                };
            }
        },
        iconClasses() {
            return {
                "icon--left": this.iconPos === "left",
                "icon--right": this.iconPos === "right",
            };
        },
        additionalIconClasses() {
            return {
                "icon--right": this.iconPos === "left",
                "icon--left": this.iconPos === "right",
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
    emits: ["update:modelValue"],
};
</script>

<template>
    <div class="form-row">
        <input v-bind="{ ...$attrs, onInput: undefined }" :placeholder="placeholder" :type="inputType" class="input" :class="inputClasses"
            :id="name" :name="name" :value="modelValue" @input="handleInput" :disabled="isDisabled"
            :aria-disabled="isDisabled" :aria-invalid="!isValid" :aria-describedby="descriptionId" />
        <button v-if="$attrs.type === 'password'"
            :aria-label="inputType === 'password' ? 'Show password' : 'Hide password'" class="password-toggle"
            @click="togglePassword" type="button">
            <svg-icon name="EyeOnIcon" size="md" hoverColor="var:primary-500" v-if="inputType === 'password'" />
            <svg-icon name="EyeOffIcon" size="md" hoverColor="var:primary-500" v-else />
        </button>
        <svg-icon
            v-if="icon"
            v-bind:name="icon" size="nm"
            class="icon":class="iconClasses"
        />
        <svg-icon
            v-if="additionalIcon"
            v-bind:name="additionalIcon" size="nm"
            class="icon additionalIcon" :class="additionalIconClasses"
        />
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
    &--standart {
        min-height: 5.6rem;
        @include text-2;
    }

    &--big {
        min-height: 6.4rem;
        @include text-1;
    }

    border-radius: $radius-2xl;
    padding-inline: 2.8rem;
    border: 0.1rem solid $neutrals-400;
    color: $neutrals-900;
    background-color: $neutrals-100;

    @include hover {
        border-color: $primary-300;
    }

    &:disabled {
        background-color: $neutrals-300;
        border-color: $neutrals-300;
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

    &--with-icon-left {
        padding-left: 6.4rem;
    }

    &--with-icon-right {
        padding-right: 7.6rem;
    }

    &--with-label {
        padding-top: 0rem;
    }

    &--validation-error {
        border-color: $warning-500;
    }

    &--server-error {
        border-color: $danger-700;
    }
}

.form-row {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & input:focus+label,
    label.up {
        top: -24%;
        @include text-3;
        color: $neutrals-600;
        background-color: $neutrals-100;
        padding-inline: 0.8rem;
        border-radius: $radius-md;
        padding-block: 0.4rem;
        margin-left: -0.4rem;
    }

    .icon {
        &--left {
            position: absolute;
            top: 1.4rem;
            left: 2.8rem;
            color: $neutrals-700;
        }

        &--right {
            position: absolute;
            top: 1.4rem;
            right: 2.8rem;
            color: $neutrals-900;
        }
    }
}

.label {
    @include text-2;
    position: absolute;
    top: 1.8rem;
    left: 2.8rem;
    color: $neutrals-600;
    transition: all 0.05s ease-in-out;

    &--with-icon-left {
        padding-left: 3.6rem;
    }

    &--with-icon-right {
        padding-right: 4.8rem;
    }
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
