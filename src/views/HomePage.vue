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
    <InputComponent :showLabel="true" label="Name" v-model="pew" />
    <TextareaComponent :showLabel="true" label="Name" v-model="pew" />
  </div>
</template>

<script lang="ts">
import ButtonComponent from '@/components/UI/button/'
import InputComponent from '@/components/UI/input/'
import TextareaComponent from '@/components/UI/textarea'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '@/store/counter'
export default {
  components: {
    ButtonComponent,
    InputComponent,
    TextareaComponent
  },
  computed: {
    ...mapState(useCounterStore, ['count', 'dubleCount'])
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'clear']),
    clearUser() {
      this.$api.auth.login()
    }
  },
  data() {
    return {
      pew: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  display: grid;
  grid-template-columns: repeat(4, 400px);
  align-items: flex-end;
  justify-content: flex-start;
  gap: 10px;
}
</style>
