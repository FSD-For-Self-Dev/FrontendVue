<script lang="ts">
import {defineComponent} from 'vue'
import PageLayout from "@/components/UI/page-layout/PageLayout.vue";

export default defineComponent({
  name: "Error404",
  components: {PageLayout}
})
</script>

<template>
  <PageLayout>
    <div class="page-wrapper">

      <img src="/src/assets/images/error404page-image.png" alt="error image" class="img" width="399" height="238">
      <h1 class="title text">Мы не нашли страницу, которую вы ищете</h1>
    <p class="subtitle text">Но мы знаем, что вас может заинтересовать</p>
    <button class="btn">На главную</button>
    </div>
  </PageLayout>
</template>

<style scoped lang="scss">
.page-wrapper{
  margin: auto;
  text-align: center;
}
  .img{
    margin: auto;
    margin-bottom: 60px;
  }
  .text{
    color: $neutrals-900;
    margin: auto;
    padding: 20px 0;
  }
  .title{
    font-size: 24px;
    padding: 0;
  }
  .subtitle{
    font-size: 16px;
  }
  .btn{
    width: 139px;
    height: 52px;
    padding: 16px 24px 16px 24px;
    border-radius: 12px;
    border: 1.27px solid $primary-400;
    background-color: $primary-400;
    margin: auto;
    cursor: pointer;
  }
</style>