<template>
  <RouterView />
  <Error500/>
  <Footer/>
</template>

<script lang="ts">
import Footer from "@/components/UI/Footer.vue";
import Error500 from "@/views/Error500.vue";

export default {
  components: {Error500, Footer},
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
