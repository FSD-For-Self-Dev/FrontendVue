<script>
import Carousel from '@/components/landing/carousel/Carousel.vue';
import Button from '@/components/UI/button/Button.vue';

export default {
  components: {
    Carousel,
    Button
  },
};
</script>

<template>
  <div class="landing">
    <div class="landing__header landing__wrapper">
      <img
        class="landing__header img"
        src="../../assets/images/landing-image1.png"
        alt="landing-header"
      />
      <h1 class="landing__header h1">
        Уникальная веб-платформа для тех, кто изучает языки!
      </h1>
      <h2 class="landing__header h2">
        Создавай и персонализируй свой собственный словарь, выполняй упражнения, пополняй
        свой словарный <br />
        запас с огромной скоростью!
      </h2>
    </div>

    <Carousel />

    <div class="landing__button-vacabulary landing__wrapper">
      <Button text="Создать собственный словарь" />
    </div>
  </div>
</template>

<style lang="scss">
.landing {
  padding: 16.4rem 0 0;

  .landing__wrapper {
    padding: 0 15.2rem;
    width: 100vw;
  }

  .landing__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin: 0 0 2rem;

    &.img {
      width: 77.9rem;
      height: 17.8rem;
    }

    &.h1 {
      font-family: 'Inter-SemiBold';
      font-size: 6rem;
      line-height: 7.5rem;
      letter-spacing: -1px;
      text-align: center;
      color: $primary-700;
    }

    &.h2 {
      @include text-1;
      text-align: center;
      color: $primary-600;
    }
  }

  .landing__button-vacabulary {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5.7rem 0 12rem;
  }
}
</style>
