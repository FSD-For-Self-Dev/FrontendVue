<script lang="ts">
import {defineComponent} from 'vue'
import Input from "@/components/UI/input/Input.vue";

export default defineComponent({
  name: "Register",
  components: {Input}
})
</script>

<template>
  <div class="page-wrapper">
    <Input model-value="" label="" placeholder="Логин"/>
    <Input model-value="" label="" type="email" placeholder="Email"/>
    <Input model-value="" label="" type="password" placeholder="Пароль"/>
  </div>
</template>

<style scoped lang="scss">

</style>