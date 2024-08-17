<!--<script setup lang="ts">-->
<!--import { defineAsyncComponent, defineProps, type PropType } from "vue";-->
<!--import type { IconProps } from "@/types/components/icon";-->


<!--const props = defineProps({-->
<!--   name: {-->
<!--     type: String as PropType<IconProps["type"]>,-->
<!--     width: Number,-->
<!--     height: Number,-->
<!--   },-->
<!--})-->

<!--const icon = defineAsyncComponent(() =>-->
<!--  import((`@/assets/icons/${props.name}.svg`))-->
<!--)-->

<!--</script>-->

<!--<template>-->
<!--  <component  :is="icon" />-->
<!--</template>-->
<script lang="ts">
import { type PropType } from 'vue';
import type { IconProps } from '@/types/components/icon';

export default {
  name: 'Icon',
  props: {
    name: {
      type: String as PropType<IconProps['type']>
    }
  },
  computed: {
    iconSrc(): string {
      if (!this.name) return ''

      try {
        return new URL(`/src/assets/icons/${this.name}.svg`, import.meta.url).href;
      } catch (error) {
        console.error(`Icon "${this.name}" not found!`, error)
        return '';
      }
    }
  }
}
</script>

<template>
  <img class="icon" :src="iconSrc" :alt="name" />
</template>

<style lang="scss">
.icon {
  margin: 0;
  padding: 0;
}
</style>