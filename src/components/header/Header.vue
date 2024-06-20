<script lang="ts">
import { defineComponent, ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import Logo from '@/components/UI/logo/Logo.vue'

const shownBar = ref(false)

export default defineComponent({
  name: "Header",
  components: { Logo, OnClickOutside },
  data() {
    return {
      shownBar
    }
  },
  computed: {
    authorized() {
      // TODO: получать статус авторизации 
      return this.$route.path !== '/'
    }
  },
  methods: {
    showSearchBar() {
      shownBar.value = true
    },
    hideSearchBar() {
      shownBar.value = false
    }
  }
})
</script>

<template>
  <OnClickOutside @trigger="hideSearchBar">
  <header class="header">
    <!-- TODO: Кнопка-иконка -->
    <img class="burger" src="../../../../public/icons/burger.svg" alt="Раскрыть меню"/>
    <div class="wrapper">
      <Logo />
      <nav v-if="authorized">
        <!-- TODO: элементы навигации -->
        <ul class="navlinks">
          <li class="navlink" >
            <img src="../../../../public/icons/vocab.svg" alt=""/>Мой словарь</li>
          <li class="navlink">
            <img src="../../../../public/icons/collection.svg" alt=""/>Коллекции</li>
          <li class="navlink">
            <img src="../../../../public/icons/exercise.svg" alt=""/>Упражнения</li>
        </ul>
      </nav>
      <div class="buttons" v-if="authorized">
        <div class="search">
          <!-- TODO: Кнопка-иконка -->
          <button class="button" @click="showSearchBar">
            <img src="../../../../public/icons/search.svg" alt="Поиск"/>
          </button>
          <div class="searchbar" :class="{ shown: shownBar }">
            <!-- TODO: инпут-поиск -->
            <div  class="input"/>
          </div>
        </div>
        <!-- TODO: Кнопка-иконка -->
        <button class="button">
          <img src="../../../../public/icons/plus.svg" alt="Раскрыть меню"/>
        </button>
        <div/>
        <div/>
        
        <!-- TODO: Кнопка-иконка -->
        <button class="link">
          <img src="../../../../public/icons/bell.svg" alt="Уведомления"/>
        </button>
        <!-- TODO: Кнопка-иконка -->
        <button class="link">
          <img src="../../../../public/icons/profile.svg" alt="Профиль пользователя"/>
        </button>
      </div>
      <div class="buttons" v-if="!authorized">
        <!-- TODO: Кнопки -->
        <button class="navlink">Войти</button>
        <button class="navlink">Зарегистрироваться</button>
      </div>
    </div>
    <!-- TODO: компонент - выпадашка с языками -->
    <img class="burger" src="../../../../public/icons/ru.svg" alt="Выбрать язык"/>
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
  background-color: #FFFFFFE6;
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

.navlink {
  padding: 1.8rem 2.3rem;
  border: 1px solid $neutrals-400;
  background-color: white;
  border-radius: $radius-xl;
  height: 5.6rem;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
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

.button {
  width: 5.6rem;
  height: 5.6rem;
  border-radius: $radius-full;
  border: 1px solid $neutrals-400;
  background-color: transparent;
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
  transition: top 0.3s, opacity 0.3s ease-out;
}

.input {
  width: calc(56.4rem + 5.6rem + ((100vw - 116rem)/2));
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