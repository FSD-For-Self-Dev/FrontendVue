<template>
<!--    <RouterView />-->
<!--  <Register/>-->
  <Login/>
</template>

<script lang="ts">
import Register from "@/views/Register.vue";

import Login from "@/views/Login.vue";

export default {
  components: {Login,Register},
    data() {
        return {};
    },
};
</script>

<style scoped lang="scss"></style>
