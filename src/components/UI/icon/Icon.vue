<script setup lang="ts">
import { computed, defineProps, type PropType } from 'vue';
import type { IconProps } from '@/types/components/icon';

const props = defineProps({
  name: {
    type: String as PropType<IconProps['type']>
  }
});

const iconSrc = computed(() => {
  if (!props.name) return ''

  try {
    return new URL(`/src/assets/icons/${props.name}.svg`, import.meta.url).href;
  } catch (error) {
    console.error(`Icon "${props.name}" not found!`, error)
    return '';
  }
});
</script>

<template>
  <img class="icon" :src="iconSrc" :alt="props.name" />
</template>

<style lang="scss">
.icon {
  margin: 0;
  padding: 0;
}
</style>