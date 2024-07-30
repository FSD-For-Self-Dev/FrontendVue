<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue'

export default {
  name: 'Error500',
  components: { PageLayout },
}
</script>

<template>
  <PageLayout>
    <div class="page-wrapper">
      <img
        src="/src/assets/images/error500page-image.png"
        alt="error image"
        class="img"
      />
      <h1 class="title text">Ошибка сервера</h1>
      <p class="subtitle text">
        Мы уже работаем над проблемой, попробуйте повторить действие позже
      </p>
      <button class="btn">На главную</button>
    </div>
  </PageLayout>
</template>

<style scoped lang="scss">
.page-wrapper {
  margin: auto;
  text-align: center;
}
.img {
  margin: auto;
  margin-bottom: 60px;
}
.text {
  color: $neutrals-900;
  margin: auto;
  padding: 20px 0;
}
.title {
  font-size: 24px;
  padding: 0;
}
.subtitle {
  font-size: 16px;
}
.btn {
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
