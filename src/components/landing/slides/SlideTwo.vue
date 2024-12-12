<script lang="ts">
import { Slide } from 'vue3-carousel';
export default {
  components: { Slide },
};
</script>

<template>
  <Slide :slide-size="{width: '344px', height: '545px'}"> <div :class="$style.wrapper"></div></Slide>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 34.5rem;
  height: 54.5rem;
  background-image: url('../../../assets/images/adpage-image5.png');
}
</style>
