<template>
<!--  <div>-->
<!--    <span style="margin-right: 50px">count</span>-->
<!--    <span>{{ count }}</span>-->
<!--  </div>-->
<!--  <div>-->
<!--    <span style="margin-right: 50px">dubleCount</span>-->
<!--    <span>{{ dubleCount }}</span>-->
<!--  </div>-->
<!--  <button @click="increment">increment</button>-->
<!--  <button @click="clearUser">clear</button>-->
  <Footer/>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/store/counter";
import Footer from "@/components/UI/Footer.vue";
export default {
  components: {Footer},
  computed: {
    ...mapState(useCounterStore, ["count", "dubleCount"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "clear"]),
    clearUser() {
      this.$api.auth.login();
    },
  },
};
</script>

<style lang="scss" scoped></style>
