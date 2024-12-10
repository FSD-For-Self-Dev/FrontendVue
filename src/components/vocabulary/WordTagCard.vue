<script lang="ts">

export default {
  props: {
    tag: {
      type: String,
      required: true
    },
  },
};
</script>

<template>
  <div class="tag"> {{ tag }} </div>
</template>

<style lang="scss" scoped>
.tag {
  @include tag-small;
  height: 2.4rem;
  padding-inline: 1.2rem;
  display: flex;
  align-items: center;
  background-color: $secondary-300;
  outline: $secondary-400 solid 0.1rem;
  color: $secondary-700;
  border-radius: $radius-xs;
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
