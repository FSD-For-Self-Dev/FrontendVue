<script lang="ts">
import type { PropType } from 'vue';


export default {
  props: {
    tag: {
      type: String,
      required: false
    },
    size: {
      type: String as PropType<'small' | 'medium'>,
      default: 'small',
    },
  },
  computed: {
    tagSize() {
      return this.size === 'small' ? 'tag--small' : 'tag--medium';
    },
  }
};
</script>

<template>
  <div class="tag" :class="tagSize"> {{ tag }} </div>
</template>

<style lang="scss" scoped>
.tag {
  &--small {
    @include tag-small;
    height: 2.4rem;
    padding-inline: 1.2rem;
  }

  &--medium {
    @include tag-big;
    height: 3.2rem;
    padding-inline: 1.6rem;
  }

  display: flex;
  align-items: center;
  background-color: $secondary-300;
  outline: $secondary-400 solid 0.1rem;
  color: $secondary-700;
  border-radius: $radius-md;
  cursor: pointer;

  @include hover {
    background-color: $secondary-100;
    color: $secondary-600;
  }

  @include active {
    background-color: $secondary-400;
    outline-color: $secondary-500;
    color: $secondary-800;
  }
}
</style>
