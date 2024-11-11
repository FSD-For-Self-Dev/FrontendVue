<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import Button from "@/components/UI/button/Button.vue";
import { menuItems } from '@/constants/wordsMock';
import BurgerMenuIcon from '@/assets/icons/common/BurgerMenuIcon.vue';
import CloseIcon from '@/assets/icons/actions/CloseIcon.vue';
export default {
  name: 'Menu',
  components: { Button, OnClickOutside, BurgerMenuIcon, CloseIcon },
  data() {
    return {
      showMenu: false,
      menuItems
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
    <BurgerMenuIcon size="32" />
  </button>
  <button class="button" @click="closeMenu" v-if="showMenu">
    <CloseIcon size="32" />
  </button>
  <div class="menu" :class="{ show: showMenu }">
    <OnClickOutside @trigger="closeMenu">
      <ul class="menu__list">
        <li v-for="menuItem in menuItems" class="menu__item">
          <button :to="menuItem.link" class="menu__item-content" @click="closeMenu">
            <span class="menu__item-name">
              {{ menuItem.name }}
            </span>
          </button>
        </li>
      </ul>
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

.menu__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.menu__item {
  padding: 0.8rem 2.4rem 0.8rem 1.2rem;
  border-radius: 1.6rem;
  cursor: pointer;

  .menu__item-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    background-color: $neutrals-100;
    border: 1px solid transparent;
    cursor: pointer;


    .menu__item-name {
      font-family: 'Inter';
      font-size: 1.6rem;
      line-height: 2rem;
      font-weight: 400;
    }
  }
}

.menu__item:nth-child(6) {
  border-top: 0.8px solid $neutrals-400;
  border-bottom: 0.8px solid $neutrals-400;
  padding: 1.8rem 2.4rem 1.8rem 1.2rem;
}

.menu__item:hover {
  background-color: $primary-500;

  .menu__item-content {
    background-color: $primary-500;
    color: $neutrals-100;
  }
}
</style>