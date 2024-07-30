<script setup lang="ts">
import { defineAsyncComponent, defineProps, type PropType } from 'vue';
import type { IconProps } from '@/types/components/icon';

const props = defineProps({
    name: {
        type: String as PropType<IconProps['type']>,
        width: Number,
        height: Number,
    },
});

const icon = defineAsyncComponent(
    () => import(`@/assets/icons/${props.name}.svg`),
);
</script>

<template>
    <component :is="icon" />
</template>
