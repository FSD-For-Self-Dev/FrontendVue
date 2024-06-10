<template class="layout">
  <!-- Header -->
  <main class="main">
    <div :class="{ wrapper: !landingPage }">
      <!-- TODO: выделить компонент для простых кнопок с иконкой -->
      <button @click="goBack" v-if="!startPage" class="button" :class="{ 'back-button': true }"/>
      <slot></slot>
      <Transition>
        <button @click="scrollToTop" class="button" :class="{ 'up-button': true }" v-if="!landingPage && y > 50"/>
      </Transition>
    </div>
  </main>
  <!-- Footer -->
</template>

<script lang="ts">
  import { useWindowScroll } from '@vueuse/core'
  import { useRouter, useRoute } from 'vue-router'

  export default {
    props: {
      landingPage: {type: Boolean, required: false, default: false},
    },
    
    setup(props) {
      const router = useRouter();
      const route = useRoute();
      const startPage = route.path === '/';
      const { x, y } = useWindowScroll({ behavior: 'smooth' })

      const goBack= () => {
        if (history.state.back) {
          router.go(-1)
        } else router.push('/')
      }
      const scrollToTop = () => {
        y.value = 0
      }
      return {
        startPage, y, goBack, scrollToTop
      }
    }
  };
</script>

<style lang="scss" scoped>
  .layout {
    min-height: 100vh;
  }
  .main {
    width: 100%;
    background-color: $neutrals-200;
    min-height: 100%;
  }
  .wrapper {
    max-width: 1600px;
    min-height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 4rem 10rem 40rem;
    margin: auto;
  }
  .button {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: $radius-full;
    border: none;
    outline: none;
    background-color: $neutrals-100;
    box-shadow: $regular-shadow;
    cursor: pointer;
  }
  .back-button {
    position: absolute;
    top: 4rem;
    left: 1.6rem;
  }
  .up-button {
    position: fixed;
    bottom: 4rem;
    right: 1.6rem;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s, transform 0.4s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }
  .v-enter-to,
  .v-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>
