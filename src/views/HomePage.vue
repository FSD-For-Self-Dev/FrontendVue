<template>
  <div>
    <span style="margin-right: 50px">count</span>
    <span>{{ count }}</span>
  </div>
  <div>
    <span style="margin-right: 50px">dubleCount</span>
    <span>{{ dubleCount }}</span>
  </div>
  <div class="div">
    <ButtonComponent
      variant="success"
      type="right-icon"
      icon="pen"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="success"
      type="right-icon"
      icon="pen"
      size="medium-long"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="success"
      type="right-icon"
      icon="pen"
      size="medium"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="success"
      type="right-icon"
      icon="pen"
      size="small"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="primary"
      type="right-icon"
      icon="pen"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="primary"
      type="right-icon"
      icon="pen"
      size="medium-long"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="primary"
      type="right-icon"
      icon="pen"
      size="medium"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="primary"
      type="right-icon"
      icon="pen"
      size="small"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="secondary"
      type="right-icon"
      icon="pen"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="secondary"
      type="right-icon"
      icon="pen"
      size="medium-long"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="secondary"
      type="right-icon"
      icon="pen"
      size="medium"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="secondary"
      type="right-icon"
      icon="pen"
      size="small"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="danger"
      type="right-icon"
      icon="pen"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="danger"
      type="right-icon"
      icon="pen"
      size="medium-long"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="danger"
      type="right-icon"
      icon="pen"
      size="medium"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <ButtonComponent
      variant="danger"
      type="right-icon"
      icon="pen"
      size="small"
      :additionalText="count.toString()"
      @click="increment"
      >Написать</ButtonComponent
    >
    <InputComponent type="text" label="Name" :showLabel="true" v-model="pew" error="Warning" />
  </div>
</template>

<script lang="ts">
import ButtonComponent from "@/components/UI/button/";
import InputComponent from "@/components/UI/input/";
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/store/counter";
export default {
  components: {
    ButtonComponent,
    InputComponent,
  },
  computed: {
    ...mapState(useCounterStore, ["count", "dubleCount"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "clear"]),
    clearUser() {
      this.$api.auth.login();
    },
  },
  data() {
    return {
      pew: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.div {
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: flex-end;
  justify-content: flex-start;
  gap: 10px;
}
</style>
