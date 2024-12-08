<script lang="ts">
import Logo from '@/components/UI/logo/Logo.vue';
import Navigation from './Navigation.vue';
import Language from './Language.vue';
import Authentication from '@/components/authentication/Authentication.vue';
import type { INavbarItems } from '@/types/components/navbar';
import { mapState } from 'pinia';
import { useUserStore } from '@/store/user';
import { OnClickOutside } from '@vueuse/components';
import Button from '@/components/UI/button/Button.vue';
import ProfileTools from './ProfileTools.vue';
import IconButton from '../UI/button/IconButton.vue';
import Search from './Search.vue';
import AddingTools from './AddingTools.vue';
import Modal from '../UI/modal/Modal.vue';

export const navbarItems: INavbarItems[] = [
    { name: 'Главная', link: 'home', icon: 'HomeIcon' },
    { name: 'Изучаемые языки', link: 'languages', icon: 'LanguageIcon' },
    { name: 'Словарь', link: 'vocabulary', icon: 'VocabularyIcon' },
    { name: 'Коллекции', link: 'collections', icon: 'CollectionsIcon' },
    { name: 'Избранное', link: 'favorites', icon: 'FavouriteIcon' },
    { name: 'Упражнения', link: 'exercises', icon: 'ExercisesIcon' },
    { name: 'О платформе', link: 'about', icon: 'InfoIcon' },
];

export default {
  components: {
    Logo,
    Button,
    IconButton,
    Navigation,
    Language,
    Authentication,
    ProfileTools,
    OnClickOutside,
    Search,
    AddingTools,
    Modal,
  },
  computed: {
    authorized() {
      return this.$route.path !== '/';
    },
    ...mapState(useUserStore, ['username', 'authStatus', 'image']),
  },
  data(): {
    showAuth: boolean;
    viewAuth: 'login' | 'register';
    showProfileTools: boolean;
    showAddingTools: boolean;
    showNewWordModal: boolean;
    showAddLanguageModal: boolean;
    shownBar: boolean;
    showNavbar: boolean;
    navbarItems: INavbarItems[];
	addIconActive: boolean;
  } {
    return {
      showAuth: false,
      viewAuth: 'login',
      showProfileTools: false,
      showAddingTools: false,
      showNewWordModal: false,
      showAddLanguageModal: false,
      shownBar: false,
      showNavbar: false,
      navbarItems,
	  addIconActive: false,
    };
  },
  methods: {
    openAuth(view: 'login' | 'register') {
      this.showAuth = !this.showAuth;
      this.viewAuth = view;
    },
    closeAuth() {
      this.showAuth = false;
    },
    switchForm(view: 'login' | 'register') {
      this.viewAuth = view;
    },
    showSearchBar(event: MouseEvent) {
      this.shownBar = true;
    },
    hideSearchBar() {
      this.shownBar = false;
    },
    openNavbar() {
      this.showNavbar = true;
    },
    closeNavbar() {
      this.showNavbar = false;
    },
  },
};
</script>

<template>
  <header class="header">
    <div class="header--left">
      <div style="width: 3.2rem; display: flex; align-items: center">
        <svg-icon
          @click="openNavbar"
          v-if="!showNavbar"
          name="BurgerMenuIcon"
          size="lg"
          hoverColor="var:primary-500"
          style="cursor: pointer"
        />
        <svg-icon
          @click="closeNavbar"
          v-if="showNavbar"
          name="CloseIcon"
          size="lg"
          hoverColor="var:primary-500"
          style="cursor: pointer"
        />
      </div>
      <Logo style="width: max-content" />
    </div>

    <div class="header--center" v-if="!shownBar">
      <div class="header--navigation">
        <Navigation v-if="authStatus" />
      </div>
      <div class="header--tools" v-if="authStatus">
        <IconButton
          icon="SearchIcon"
          size="lg"
          variant="secondary"
          @click="showSearchBar"
        />
        <IconButton
          style="min-width: 5.6rem"
          icon="AddIcon"
          size="lg"
          variant="primary"
		  :class="{active: addIconActive}"
          @click.stop="() => {showAddingTools = !showAddingTools; addIconActive = true}"
        />
      </div>
      <AddingTools
        :handleClose="() => {showAddingTools = false; addIconActive = false}"
        :handle-add-word="
          () => {
            showNewWordModal = true;
            showAddingTools = false;
			addIconActive = false;
          }
        "
        :handle-add-language="
          () => {
            showAddLanguageModal = true;
            showAddingTools = false;
			addIconActive = false;
          }
        "
        v-if="showAddingTools"
      />
      <Modal
        size="lg"
        v-if="showNewWordModal"
        :close-modal="() => (showNewWordModal = false)"
        title-modal="Новое слово"
        icon="AddIcon"
        modalContent="NewWordForm"
      />
      <Modal
        size="md"
        v-if="showAddLanguageModal"
        :close-modal="() => (showAddLanguageModal = false)"
        title-modal="Добавить изучаемые языки"
        icon="ExercisesIcon"
        modalContent="AddLanguagesForm"
      />
    </div>

    <div class="header--center" style="width: 100%; max-width: 80rem" v-else>
      <div class="header--tools" style="width: 100%">
        <OnClickOutside @trigger="hideSearchBar" style="width: 100%; display: flex">
          <Search />
        </OnClickOutside>
        <IconButton
          style="min-width: 5.6rem"
          icon="AddIcon"
          size="lg"
          variant="primary"
        />
      </div>
    </div>

    <Authentication
      :switch-form="switchForm"
      :close-auth="closeAuth"
      :show-auth="showAuth"
      :view-auth="viewAuth"
      v-if="!authStatus"
    />

    <div class="header--right">
      <div class="header--auth-buttons" v-if="!authStatus">
        <Button text="Войти" size="normal" @click="() => openAuth('login')" />
        <Button
          text="Зарегистрироваться"
          size="normal"
          variant="secondary"
          @click="() => openAuth('register')"
        />
      </div>

      <div class="header--user" v-if="authStatus">
        <IconButton icon="BellIcon" size="md" variant="secondary" />
        <img
          class="header--avatar"
          :src="image"
          v-if="image"
          @click.stop="() => (showProfileTools = !showProfileTools)"
        />
        <IconButton
          v-else
          icon="ProfileIcon"
          size="md"
          variant="secondary"
          @click.stop="() => (showProfileTools = !showProfileTools)"
        />
      </div>

      <div class="header--language">
        <Language />
      </div>

      <Teleport to="body">
        <ProfileTools
          :handleClose="() => (showProfileTools = false)"
          v-if="showProfileTools"
        />
      </Teleport>
    </div>
  </header>
  <div class="navbar" :class="{ show: showNavbar }">
    <OnClickOutside @trigger="closeNavbar" class="navbar__wrapper">
      <ul class="navbar__list">
        <li v-for="navbarItem in navbarItems" class="navbar__item">
          <router-link :to="{ name: navbarItem.link }" class="navbar__item-content" @click="closeNavbar">
            <svg-icon :name="navbarItem.icon" size="nm" class="navbar__item-icon" />
            <span class="navbar__item-name">
              {{ navbarItem.name }}
            </span>
          </router-link>
        </li>
      </ul>
    </OnClickOutside>
  </div>
</template>

<style lang="scss">
.header {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffffdd;
  box-shadow: $regular-shadow;
  padding: 2.2rem 3.2rem;
  backdrop-filter: blur(4px);

  .header--left {
    display: flex;
    gap: 4rem;
    width: max-content;
  }

  .header--center {
    position: relative;
    display: flex;
    gap: 4rem;
    align-items: center;

    .header--navigation {
      display: flex;
      gap: 1.2rem;
    }

    .header--tools {
      display: flex;
      gap: 1.2rem;
    }
  }

  .header--right {
    display: flex;
    gap: 4rem;
    align-items: center;

    .header--auth-buttons {
      display: flex;
      gap: 1.6rem;
    }

    .header--user {
      display: flex;
      gap: 1.2rem;
    }

    .header--avatar {
      width: 4.4rem;
      height: 4.4rem;
      border-radius: 50%;
      object-fit: cover;
      border: none;
      cursor: pointer;

      @include hover {
        opacity: 0.9;
      }
    }
  }
}

.button {
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.navbar {
  position: fixed;
  z-index: 9;
  top: 10rem;
  left: -29rem;
  min-width: 26rem;
  height: calc(100svh - 10rem);
  background-color: #ffffffdd;
  box-shadow: $regular-shadow;
  backdrop-filter: blur(4px);
  padding: 2.5rem;

  transition:
    left 0.3s,
    opacity 0.3s ease-out;

  &.show {
    opacity: 1;
    left: 0;
  }

  .navbar__content {
    height: 100%;
    width: 100%;
    backdrop-filter: blur(4px);
  }
}

.navbar__list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%;
  overflow-y: auto;
  @include scroll;
}

.navbar__wrapper {
  height: 100%;
}

.navbar__item {
  height: 6rem;
  padding: 0.8rem 2.4rem 0.8rem 1.2rem;
  border-radius: $radius-xs;
  cursor: pointer;
  display: flex;
  align-items: center;

  .navbar__item-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;

    .navbar__item-name {
      @include text-2;
    }
  }

  .navbar__item-icon {
    stroke-width: 0.2;
  }

  @include hover {
    background-color: $primary-300;
  }

  @include active {
    background-color: $primary-500;
  }
}
</style>
