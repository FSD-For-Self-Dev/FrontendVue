<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import SlideOne from '@/components/landing/slides/SlideOne.vue';
import SlideTwo from '@/components/landing/slides/SlideTwo.vue';

export default {
  components: {
    Carousel,
    Slide,
    SlideOne,
    SlideTwo,
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

    <div class="landing__carousel">
      <Carousel
        :wrap-around="true"
        :items-to-show="5"
        :autoplay="0"
        :gap="16"
        pauseAutoplayOnHove
        snapAlign="end"
      >
        <SlideOne />

        <SlideTwo />

        <Slide><div class="landing__slide">2</div></Slide>

        <Slide><div class="landing__slide">2</div></Slide>

        <Slide><div class="landing__slide">2</div></Slide>

        <Slide><div class="landing__slide">2</div></Slide>

        <Slide><div class="landing__slide">2</div></Slide>
      </Carousel>
    </div>
  </div>
</template>

<style lang="scss">
.landing {
  padding: 16.4rem 0 0;

  .landing__wrapper {
    padding: 0 15.2rem;
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
}

.landing__carousel {
  height: 54.5rem;
  position: relative;
  overflow: hidden;

  .warraper {
    padding: 0;
  }
}

.landing__slide {
  width: 34.5rem;
  height: 54.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.6rem 0 0;
  gap: 1.6rem;
}
</style>
