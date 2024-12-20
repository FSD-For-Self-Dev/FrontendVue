<script lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import SlideOne from '@/components/landing/carousel/SlideOne.vue';
import SlideTwo from '@/components/landing/carousel/SlideTwo.vue';
import SlideThree from '@/components/landing/carousel/SlideThree.vue';
import SlideFour from '@/components/landing/carousel/SlideFour.vue';
import SlideFive from '@/components/landing/carousel/SlideFive.vue';
import SlideSix from '@/components/landing/carousel/SlideSix.vue';

export default {
  components: {
    Carousel,
    Slide,
    SlideOne,
    SlideTwo,
    SlideThree,
    SlideFour,
    SlideFive,
    SlideSix,
  },
};
</script>

<template>
  <Carousel
    :wrap-around="true"
    :items-to-show="4"
    :autoplay="10000"
    pauseAutoplayOnHove
    snapAlign="start"
  >
    <SlideOne />

    <SlideTwo />

    <SlideThree />

    <SlideFour />

    <SlideFive />

    <SlideSix />
  </Carousel>
</template>
