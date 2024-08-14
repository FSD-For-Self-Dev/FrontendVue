<script lang="ts">
import Icon from '@/components/UI/icon/Icon.vue';
import { OnClickOutside } from '@vueuse/components';
export default {
  name: 'Menu',
  components: { Icon, OnClickOutside },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    openMenu() {
      this.showMenu = true;
    },
    closeMenu() {
      this.showMenu = false;
    },
  }
}
</script>

<template>
  <button class="button" @click="openMenu" v-if="!showMenu">
    <Icon name="burger-menu" width="32" height="32" />
  </button>
  <button class="button" @click="closeMenu" v-if="showMenu">
    <Icon name="close" width="32" height="32" />
  </button>
  <div class="menu" :class="{ show: showMenu }">
    <OnClickOutside @trigger="closeMenu">
      <div></div>
    </OnClickOutside>
  </div>
</template>

<style lang="scss">
.button {
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.menu {
  position: fixed;
  top: 10rem;
  left: -29rem;
  min-width: 26rem;
  height: calc(100svh - 10rem);
  background-color: $neutrals-100;
  opacity: 0;
  box-shadow: $regular-shadow;
  backdrop-filter: blur(4px);
  padding: 2.5rem;

  transition:
    left 0.3s,
    opacity 0.3s ease-out;

  &.show {
    opacity: 1;
    left: 0
  }

  .menu__content {
    height: 100%;
    width: 100%;
    backdrop-filter: blur(4px);
  }
}
</style>