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
  <button @click="clearUser">clear</button>
  <Icon :name="pen" class="icon" />
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/store/counter";
import Icon from "@/components/Icon.vue";
export default {
  components: {Icon},
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
