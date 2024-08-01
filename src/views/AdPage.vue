<script lang="ts">
import {defineComponent} from 'vue'
import PageLayout from "@/components/UI/page-layout/PageLayout.vue";
import Header from "@/components/header/Header.vue";

export default defineComponent({
  name: "AdPage",
  components: {Header, PageLayout}
})
</script>

<template>
  <PageLayout>
    <div class="page-wrapper">
      <section class="hero">
        <div class="hero-words">
<!--          <div class="hero-word rotate-1">Синонимы</div>-->
<!--          <div class="hero-word rotate-2">Примеры</div>-->
<!--          <div class="hero-word rotate-3">Переводы</div>-->
<!--          <div class="hero-word rotate-4">Коллекции</div>-->
<!--          <div class="hero-word rotate-5">Переводчик</div>-->
<!--          <div class="hero-word rotate-6">Ассоциации</div>-->
<!--          <div class="hero-word rotate-7">Упражнения</div>-->
<!--          <div class="hero-word rotate-8">Мой словарь</div>-->
<!--          <div class="hero-word rotate-9">Антонимы</div>-->
<!--          <div class="hero-word rotate-10">Избранное</div>-->
<!--          <div class="hero-word rotate-11">Определения</div>-->

          <div class="hero-word ">Примеры</div>
          <div class="hero-word ">Коллекции</div>
          <div class="hero-word ">Переводчик</div>
          <div class="hero-word ">Упражнения</div>
          <div class="hero-word ">Антонимы</div>
          <div class="hero-word ">Определения</div>
          <div class="hero-word ">Синонимы</div>
          <div class="hero-word ">Переводы</div>
          <div class="hero-word ">Ассоциации</div>
          <div class="hero-word ">Мой словарь</div>
          <div class="hero-word ">Избранное</div>
        </div>
      </section>
    </div>
  </PageLayout>
</template>

<style scoped lang="scss">
.hero{
}
  .hero-words{
    width: 870px;
    margin: auto;
  }
  .hero-word{
    display: inline-block;
    position: relative;

    height: 44px;
    background-color: $primary-100;
    padding: 12px 20px 12px 20px;
    border-radius: 40px;
  }

.hero-word:nth-child(1){
  top:40px
}
.hero-word:nth-child(2){
  top: 11px;
  transform: rotate(357deg);
}
.hero-word:nth-child(3){
  top: 30px;
  transform: rotate(345deg);
}
.hero-word:nth-child(4){
  //top: px;
  transform: rotate(337deg);
}
.hero-word:nth-child(5){
  top: 38px;
  transform: rotate(-345deg);
}
.hero-word:nth-child(6){
  top: px;
  transform: rotate(-330deg);

}
  .hero-word:nth-child(7){
    top:78px;
    transform: rotate(-330deg);
  }

  .hero-word:nth-child(8){
    top: 70px;
    transform: rotate(345deg);

  }

.hero-word:nth-child(9){
  top: 108px;
  transform: rotate(353deg);
}


.hero-word:nth-child(10){
  top: 102px;
  transform: rotate(-355deg);
}

.hero-word:nth-child(11){
  top: 120px;
  transform: rotate(355deg);

}







</style>