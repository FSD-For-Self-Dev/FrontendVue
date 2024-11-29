<script lang="ts">
import type { PropType } from "vue";
import type { TextButtonProps } from "@/types/components/text-button";

export default {
  props: {
    text: {
      type: String as PropType<TextButtonProps["text"]>,
      required: false,
    },
    icon: {
      type: String as PropType<TextButtonProps["icon"]>,
      required: false,
    },
    iconPos: {
      type: String as PropType<TextButtonProps["iconPos"]>,
      default: "left",
    },
  },
};
</script>

<template>
  <button class="text-button">
    <svg-icon v-if="icon && iconPos === 'left'" v-bind:name="icon" size="md" class="icon" />
    <span style="float: left; text-align: left;">
      {{ text }}
    </span>
    <svg-icon v-if="icon && iconPos === 'right'" v-bind:name="icon" size="md" class="icon" />
  </button>
</template>

<style lang="scss" scoped>
.text-button {
  @include text-3;
  display: inline-flex;
  width: max-content;
  background-color: transparent;
  border: transparent;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  color: $primary-500;

  .icon {
    stroke-width: 0.02rem;
    transition: none;
    color: $primary-500;
  }

  &:disabled {
    cursor: not-allowed;
    color: $neutrals-600;

    .icon {
      color: $neutrals-600;
    }
  }

  @include hover {
    color: $primary-700;

    .icon {
      color: $primary-700;
    }
  }

  @include active {
    color: $primary-800;

    .icon {
      color: $primary-800;
    }
  }

  @include focus {
    color: $primary-800;

    .icon {
      color: $primary-800;
    }
  }
}

</style>
