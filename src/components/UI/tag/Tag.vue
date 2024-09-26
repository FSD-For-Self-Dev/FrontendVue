<script lang="ts">
import type { PropType } from "vue";

interface TagProps {
  type: "text" | "left-icon" | "right-icon";
  icon?: "status-inactive" | "chosen-active" | "close" | "plus";
  size: "big" | "small" | "large";
  additionalText?: string;
}

export default {
  props: {
    type: {
      type: String as PropType<TagProps["type"]>,
      default: "tag--big",
    },
    icon: {
      type: String as PropType<TagProps["icon"]>,
    },
    additionalText: {
      type: String as PropType<TagProps["additionalText"]>,
      required: false,
    },
  },
  computed: {
    tagClasses() {
      return {
        "tag--big": this.size === "big",
        "tag--small": this.size === "small",
        "tag--large": this.size === "large",
      };
    },
  },
};
</script>

<template>
  <div>
    <p class="tag" :class="tagClasses">
      <span v-if="type === 'left-icon'" class="icon">
        {{ icon }}
      </span>
      <span>
        <slot />
      </span>
      <span v-if="type === 'right-icon'" class="icon">
        {{ icon }}
      </span>
      <span v-if="additionalText" class="additional">
        {{ additionalText }}
    </span>
    </p>
  </div>
</template>

<style scoped lang="scss">
.tag {
  width: max-content;
  border: 0.1rem solid $secondary-400;
  font-weight: 400;
  background-color: $secondary-300;
  color: $secondary-700;
  border-radius: 0.8rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 0.8rem 1.6rem;

  @include hover {
    color: $secondary-600;
    background-color: $secondary-200;
  }

  @include active {
    background-color: $secondary-400;
    border-color: $secondary-500;
  }

  &--small {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }

  &--large {
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
  }
}

.icon svg {
  width: 1.6rem;
  height: 1.6rem;
}
</style>