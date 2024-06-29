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

<BaseIcon icon-name="pen"
          width="20px"
          height="20px" >
  <IconPen />
</BaseIcon>
  <BaseIcon icon-name="home"
            width="44px"
            height="44px">
    <IconHome />
  </BaseIcon>


</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/store/counter";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import IconPen from "@/components/icons/IconPen.vue";
import IconHome from "@/components/icons/IconHome.vue";


export default {
  components: {IconPen, BaseIcon, IconHome },
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
