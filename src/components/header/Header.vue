<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import Logo from '../UI/logo/Logo.vue';
import Button from '../UI/button/Button.vue';
import CircleButton from '../UI/circle-button/CircleButton.vue';

export default {
    components: { OnClickOutside, Logo, Button, CircleButton },
    data() {
        return {
            shownBar: false,
        };
    },
    computed: {
        authorized() {
            // TODO: получать статус авторизации
            return this.$route.path !== '/';
        },
    },
    methods: {
        showSearchBar() {
            this.shownBar = true;
        },
        hideSearchBar() {
            this.shownBar = false;
        },
    },
};
</script>

<template>
  <OnClickOutside @trigger="hideSearchBar">
    <header class="header">
      <!-- TODO: Кнопка-иконка -->
      <CircleButton size="large" variant="ghost" icon="burger-menu" aria-label="Открыть меню"/>
      <div class="wrapper">
        <Logo />
        <nav v-if="authorized">
          <!-- TODO: элементы навигации -->
          <ul class="navlinks">
            <li class="navlink"><img src="#" alt="" />Мой словарь</li>
            <li class="navlink"><img src="#" alt="" />Коллекции</li>
            <li class="navlink"><img src="#" alt="" />Упражнения</li>
          </ul>
        </nav>
        <div class="buttons" v-if="authorized">
          <div class="search">
            <!-- TODO: Кнопка-иконка -->
            <CircleButton @click="showSearchBar" icon="search" aria-label=""Поиск/>
            <div class="searchbar" :class="{ shown: shownBar }">
              <!-- TODO: инпут-поиск -->
              <div class="input" />
            </div>
          </div>
          <!-- TODO: Кнопка-иконка -->
          <button class="button">
            <img src="#" alt="Раскрыть меню" />
          </button>
          <div />
          <div />

          <!-- TODO: Кнопка-иконка -->
          <button class="link">
            <img src="#" alt="Уведомления" />
          </button>
          <!-- TODO: Кнопка-иконка -->
          <button class="link">
            <img src="#" alt="Профиль пользователя" />
          </button>
        </div>
        <div class="buttons" v-if="!authorized">
          <!-- TODO: Кнопки -->
          <Button variant="primary" size="small">Войти</Button>
          <Button variant="secondary" size="small">Зарегистрироваться</Button>
        </div>
      </div>
      <!-- TODO: компонент - выпадашка с языками -->
      <CircleButton size="large" variant="ghost" icon="russian" aria-label="Выбрать язык"/>
    </header>
  </OnClickOutside>
</template>

<style scoped lang="scss">
.header {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    display: flex;
    gap: 3.2rem;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffffe6;
    box-shadow: $regular-shadow;
    padding: 2.2rem 3.2rem;
    backdrop-filter: blur(4px);
}

.wrapper {
    width: 100%;
    max-width: 1400px;
    display: flex;
    gap: 4rem;
    justify-content: space-between;
    align-items: center;
}

.navlinks {
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
    align-items: center;
    width: 56.4rem;
}

.buttons {
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
    align-items: center;
}

.burger {
    cursor: pointer;
}

.link {
    width: 4.4rem;
    height: 4.4rem;
    border-radius: $radius-full;
    border: 1px solid $neutrals-400;
    background-color: transparent;
    cursor: pointer;
}

.search {
    position: relative;
}

.searchbar {
    position: absolute;
    right: -0.4rem;
    top: -10rem;
    opacity: 0;
    padding: 0.4rem;
    transition:
        top 0.3s,
        opacity 0.3s ease-out;
}

.input {
    width: calc(56.4rem + 5.6rem + ((100vw - 116rem) / 2));
    max-width: 81.4rem;
    height: 5.6rem;
    border: 2px solid $primary-400;
    border-radius: $radius-lg;
    background-color: white;
}

.shown {
    top: -0.4rem;
    opacity: 1;
}
</style>
