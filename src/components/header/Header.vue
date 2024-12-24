<script lang="ts">
import Logo from '@/components/UI/logo/Logo.vue';
import Navigation from './Navigation.vue';
import Language from './Language.vue';
import type { INavbarItems } from '@/types/components/navbar';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useUserStore } from '@/store/user';
import { OnClickOutside } from '@vueuse/components';
import Button from '@/components/UI/button/Button.vue';
import ProfileTools from './ProfileTools.vue';
import IconButton from '../UI/button/IconButton.vue';
import Search from './Search.vue';
import AddingTools from './AddingTools.vue';
import { useModalStore } from '@/store/modal';
import { useAuthStore } from '@/store/auth';

export const navbarItems: INavbarItems[] = [
    { name: 'navigation.homePage', link: 'home', icon: 'HomeIcon' },
    { name: 'navigation.learningLanguages', link: 'languages', icon: 'LanguageIcon' },
    { name: 'navigation.vocabulary', link: 'vocabulary', icon: 'VocabularyIcon' },
    { name: 'navigation.collections', link: 'collections', icon: 'CollectionsIcon' },
    { name: 'navigation.favorites', link: 'favorites', icon: 'FavouriteIcon' },
    { name: 'navigation.exercises', link: 'exercises', icon: 'ExercisesIcon' },
    { name: 'navigation.aboutUs', link: 'about', icon: 'InfoIcon' },
];

export default {
  components: {
    Logo,
    Button,
    IconButton,
    Navigation,
    Language,
    ProfileTools,
    OnClickOutside,
    Search,
    AddingTools,
  },
  emits: ["localeUpdated"],
  computed: {
    ...mapState(useUserStore, ['username', 'authStatus', 'image']),
    ...mapWritableState(useAuthStore, ['authForm']),
    authorized() {
      return this.$route.path !== '/';
    },
  },
  data(): {
    showProfileTools: boolean;
    showAddingTools: boolean;
    shownBar: boolean;
    showNavbar: boolean;
    navbarItems: INavbarItems[];
	  addIconActive: boolean;
  } {
    return {
      showProfileTools: false,
      showAddingTools: false,
      shownBar: false,
      showNavbar: false,
      navbarItems,
	    addIconActive: false,
    };
  },
  methods: {
    ...mapActions(useModalStore, ['openModal']),
    ...mapActions(useAuthStore, ['openAuthModal']),
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
    toggleAddingTools() {
      this.showAddingTools = !this.showAddingTools;
      this.addIconActive = !this.addIconActive;
    },
    closeAddingTools() {
      this.showAddingTools = false;
      this.addIconActive = false
    },
    toggleProfileTools() {
      this.showProfileTools = !this.showProfileTools;
    },
    closeProfileTools() {
      this.showProfileTools = false;
    },
    updateLocale() {
      this.$emit("localeUpdated");
    },
  },
};
</script>

<template>
  <header class="header">
    <div class="header--left">
      <div style="width: 3.2rem; display: flex; align-items: center">
        <svg-icon
          @click.stop="openNavbar"
          v-if="!showNavbar"
          name="BurgerMenuIcon"
          size="lg"
          hoverColor="var:primary-500"
          style="cursor: pointer"
        />
        <svg-icon
          @click.stop="closeNavbar"
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
          @click.stop="showSearchBar"
        />
        <IconButton
          style="min-width: 5.6rem"
          icon="AddIcon"
          size="lg"
          variant="primary"
		      :class="{active: addIconActive}"
          @click.stop="toggleAddingTools"
        />
      </div>
      <AddingTools
        :handleClose="closeAddingTools"
        :handle-add-word="
          () => {
            openModal(
              'NewWordForm',
              $t('title.newWord'),
              'AddIcon',
              'lg',
            );
            closeAddingTools();
          }
        "
        :handle-add-language="
          () => {
            openModal(
              'AddLanguagesForm',
              $t('title.newLearningLanguages'),
              'ExercisesIcon',
              'md',
            );
            closeAddingTools();
          }
        "
        v-if="showAddingTools"
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

    <div class="header--right">
      <div class="header--auth-buttons" v-if="!authStatus">
        <Button
          :text="$t('auth.logIn')"
          size="normal"
          @click.stop="openAuthModal"
        />
        <Button
          :text="$t('auth.signUp')"
          size="normal"
          variant="secondary"
          @click.stop="() => {authForm = 'signup'; openAuthModal()}"
        />
      </div>

      <div class="header--user" v-if="authStatus">
        <IconButton icon="BellIcon" size="md" variant="secondary" />
        <img
          class="header--avatar"
          :src="image"
          v-if="image"
          @click.stop="toggleProfileTools"
        />
        <IconButton
          v-else
          icon="ProfileIcon"
          size="md"
          variant="secondary"
          @click.stop="toggleProfileTools"
        />
      </div>

      <div class="header--language">
        <Language @locale-updated="updateLocale" />
      </div>

      <Teleport to="body">
        <ProfileTools
          :handleClose="closeProfileTools"
          v-if="showProfileTools"
        />
      </Teleport>
    </div>
  </header>

  <div class="navbar" :class="{ show: showNavbar }">
    <OnClickOutside @trigger="closeNavbar" class="navbar__wrapper">
      <ul class="navbar__list">
        <li v-for="navbarItem in navbarItems" class="navbar__item">
          <router-link :to="{ name: navbarItem.link }" class="navbar__item-content" @click.stop="closeNavbar">
            <svg-icon :name="navbarItem.icon" size="nm" class="navbar__item-icon" />
            <span class="navbar__item-name">
              {{ $t(navbarItem.name) }}
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
      border-radius: $radius-full;
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
  border-radius: $radius-md;
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
    border: 0.1rem solid transparent;
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
