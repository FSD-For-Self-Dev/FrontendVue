<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Icon from "@/components/UI/icon/Icon.vue";
import type SearchProps from "@/types/components/search";


export default defineComponent({
  components: { Icon },
  inheritAttrs: false,
  props: {
    label: {
      type: String as PropType<SearchProps["label"]>,
    },
    modelValue: {
      type: String as PropType<SearchProps["modelValue"]>,
    },
    placeholder: {
      type: String as PropType<SearchProps["placeholder"]>,
      default: "Найти слово или фразу...",
    },
    size: {
      type: String as PropType<SearchProps["size"]>,
      default: "normal"
    },
  },
  computed: {
    name() {
      return this.label.toLowerCase();
    },
    descriptionId() {
      return `${this.name}-label`;
    },
    isDisabled() {
      return Boolean(this.$attrs.disabled);
    },
    inputClasses() {
      return {
        "input--normal": this.size === "normal",
        "input--large": this.size === "large",
      };
    },
    iconClasses() {
      return {
        "icon--normal": this.size === "normal",
        "icon--large": this.size === "large",
      };
    },
  },
  methods: {
    handleInput(event: InputEvent) {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
    },
  },
});
</script>

<template>
  <div class="form-row">
    <input
      v-bind="{ ...$attrs, onInput: undefined }"
      type="search"
      class="input"
      :class="inputClasses"
      :id="name"
      :name="name"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :aria-describedby="descriptionId"
    />
    <label :id="`${name}-label`" class="visually-hidden" :for="name">
      {{ label }}
    </label>
    <Icon class="icon" :class="iconClasses" name="search" />
  </div>
</template>

<style lang="scss" scoped>
.input {
  min-width: 32rem;
  border-radius: $radius-2xl;
  padding-right: 2rem;
  border: 0.1rem solid $neutrals-400;
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 500;
  color: $neutrals-700;

  @include hover {
    border: 0.1rem solid $primary-300;
  }

  &:disabled {
    background-color: $neutrals-200;
    border-color: $neutrals-200;
    color: $neutrals-600;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    border: 0.1rem solid $primary-300;
  }

  &--normal {
    min-height: 5.6rem;
    font-size: 1.6rem;
    line-height: 2rem;
    padding-left: 5.2rem;
  }

  &--large {
    min-height: 6.4rem;
    font-weight: 600;
    padding-left: 6.4rem;
  }
}

.form-row {
  position: relative;
  display: flex;
  flex-direction: column;
}

.icon {
  color: $neutrals-700;
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);

  &--normal {
    @include square(2.4rem);
  }

  &--large {
    @include square(3.2rem);
  }
}
</style>
