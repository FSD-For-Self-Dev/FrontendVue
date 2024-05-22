<template>
  <div>
    <span style="margin-right: 50px">count</span>
    <span>{{ count }}</span>
  </div>
  <div>
    <span style="margin-right: 50px">dubleCount</span>
    <span>{{ dubleCount }}</span>
  </div>
  <button @click="increment">increment</button>
  <button @click="clear">clear</button>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/store/counter";
export default {
  computed: {
    ...mapState(useCounterStore, ["count", "dubleCount"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "clear"]),
  },
};
</script>

<style lang="scss" scoped></style>
