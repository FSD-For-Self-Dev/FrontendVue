<template>
  <PageLayout>
    <button @click="goVacab">в словарь</button>
    <div>
      <span style="margin-right: 50px">count</span>
      <span>{{ count }}</span>
    </div>
    <div>
      <span style="margin-right: 50px">doubleCount</span>
      <span>{{ doubleCount }}</span>
    </div>
    <button @click="increment">increment</button>
    <button @click="clear">clear</button>
  </PageLayout>
</template>

<script lang="ts">
import PageLayout from '../components/UI/PageLayout/PageLayout.vue';
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/store/counter";
import { useRouter } from 'vue-router'
export default {
  components: { PageLayout },
  
  computed: {
    ...mapState(useCounterStore, ["count", "doubleCount"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "clear"]),
    clearUser() {
      this.$api.auth.login();
    },
  },
  setup () {
    const router = useRouter();
    const goVacab = () => router.push('/vocabulary');
    
    return {
      goVacab
    }
  }
  
};
</script>

<style lang="scss" scoped></style>
