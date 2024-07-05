<template>
  <PageLayout>
    <Button variant="secondary" size="medium-long" @click="goToVocab">в словарь</Button>
    <div>
      <span style="margin-right: 50px">count</span>
      <span>{{ count }}</span>
    </div>
    <div>
      <span style="margin-right: 50px">doubleCount</span>
      <span>{{ doubleCount }}</span>
    </div>
    <Button variant="primary" @click="increment">increment</Button>
    <Button variant="success" size="small" @click="clear">clear</Button>
  </PageLayout>
</template>

<script lang="ts">
import { PageLayout, Button } from "@/components/UI";
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/store/counter";
import Footer from "@/components/UI/Footer.vue";
export default {
  components: { PageLayout, Button },
  computed: {
    ...mapState(useCounterStore, ["count", "dubleCount"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "clear"]),
    clearUser() {
      this.$api.auth.login();
    },
    goToVocab() {
      this.$router.push({ path: "/vocabulary" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
