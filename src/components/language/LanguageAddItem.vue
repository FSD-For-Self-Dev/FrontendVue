<script lang="ts">
import type { LanguageDto } from '@/dto/languages.dto';
import { type PropType } from 'vue';

export default {
  emits: ["toggleActiveLanguage"],
  props: {
    language: {
      type: Object as PropType<LanguageDto>,
      required: true,
    },
    variant: {
      type: String as PropType<'short' | 'standart'>,
      default: 'standart',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <div
    class="languages-form--list-item"
    @click="() => $emit('toggleActiveLanguage', language)"
    :class="{'active': active}"
    v-if="variant === 'short'"
  >
    <img :src="language.flag_icon" />
    <span>{{ language.name_local }}</span>
  </div>
</template>

<style lang="scss" scoped>
.languages-form--list-item {
  @include text-2;
  color: $neutrals-900;
  width: 17.5rem;
  height: 4.8rem;
  border: 0.1rem solid $neutrals-400;
  border-radius: 1.2rem;
  padding: 1.2rem 1.6rem;
  display: flex;
  gap: 1.2rem;
  cursor: pointer;
  user-select: none;

  span {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background-color: $primary-200;
    border-color: $primary-200;
  }

  &:active {
    background-color: $primary-300;
    border-color: $primary-300;
  }

  &.active {
    background-color: $primary-300;
    border-color: $primary-300;
  }
}
</style>