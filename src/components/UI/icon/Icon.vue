<script lang="ts">
import { type PropType, defineComponent, shallowRef, onMounted, markRaw } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  setup(props) {
    const IconComponent = shallowRef<any>(null);

    onMounted(async () => {
      try {
        const importedIcon = (await import(`@/components/icons/${props.name}.svg?component`)).default;
        IconComponent.value = markRaw(importedIcon);
      } catch (error) {
        console.error(`Failed to load icon: ${props.name}`, error);
      }
    });

    return { IconComponent };
  }
});
</script>

<template>
  <component class="icon" v-if="IconComponent" :is="IconComponent" :width="width" :height="height" :color="color" />
</template>

<style lang="scss">
.icon {
  display: inline;
}
</style>