<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
export default {
  data() {
    return {
      greeting: "Hello World!",
    };
  },
};
</script>

<style scoped lang="scss">
.greeting {
  color: red;
  font-weight: bold;
}
</style>
