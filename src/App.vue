<template>
  <RouterView />
  <Footer />
</template>

<script lang="ts">
import Error404 from "@/views/Error404.vue";

export default {
  components: { Footer },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
