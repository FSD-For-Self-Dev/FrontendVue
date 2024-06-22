<template>
  <RouterView />
  <Error404/>
</template>

<script lang="ts">
import Error404 from "@/views/Error404.vue";

export default {
  components: {Error404},
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
