<script lang="ts">
import Carousel from '@/components/landing/carousel/Carousel.vue';
import Button from '@/components/UI/button/Button.vue';
import Authentication from '@/components/authentication/Authentication.vue';
import AddIcon from '@/components/icons/AddIcon.vue';
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';

export default {
  setup() {
    const languagesStore = useLanguagesStore();
    const englishUrl = languagesStore.global_languages.find(
      (language) => language.isocode === 'en-gb',
    )?.flag_icon;
    const frenchUrl = languagesStore.global_languages.find(
      (language) => language.isocode === "fr-fr"
    )?.flag_icon;
    return {
      englishUrl,
      frenchUrl,
    };
  },
  data() {
    return {
      showAuth: false,
      viewAuth: 'login' as 'login' | 'register',
    };
  },
  components: {
    Carousel,
    Button,
    Authentication,
    AddIcon,
  },
  methods: {
    loginProcceedHandle() {
      this.$emit("loginProcceed");
    },
  }
};
</script>

<template>
  <div :class="$style.landing">
    <section :class="$style.header">
      <img
        :class="$style.img"
        src="../../assets/images/landing-image1.png"
        alt="landing-header"
      />
      <h1 :class="$style.h1">Уникальная веб-платформа для тех, кто изучает языки!</h1>
      <h2 :class="$style.h2">
        Создавай и персонализируй свой собственный словарь, выполняй упражнения, пополняй
        свой словарный <br />
        запас с огромной скоростью!
      </h2>
    </section>

    <Carousel />

    <div :class="$style['button-vacabulary-wrapper']">
      <button :class="$style.button" @click="showAuth = true">
        Создать собственный словарь
      </button>
    </div>

    <section :class="$style['vocabulary-info']">
      <div :class="$style.left">
        <img :class="$style.img1" src="../../assets/images/landing-mock-word1.png" />
        <img :class="$style.img2" src="../../assets/images/landing-mock-word2.png" />
        <button :class="$style.button" @click="showAuth = true">
          <AddIcon /> Новое слово или фраза
        </button>
      </div>

      <div :class="$style.right">
        <h2 :class="$style.h2">Создатель словаря - ты сам</h2>
        <p :class="$style.p">
          Веди свой собственный словарь для одного или нескольких изучаемых языков -
          добавляй в него слова, которые уже знаешь или хочешь запомнить
        </p>

        <div :class="$style.profile">
          <ul :class="$style.langs">
            <li :class="$style.lang">
              <img width="24" height="24" :src="englishUrl" />
              <h3 :class="$style['lang-name']">English</h3>
              <span :class="$style['lang-words']">1325 слов</span>
            </li>

            <li :class="$style.lang">
              <img width="24" height="24" :src="frenchUrl" />
              <h3 :class="$style['lang-name']">Français</h3>
              <span :class="$style['lang-words']">335 слов</span>
            </li>
          </ul>
          <img :class="$style.img" src="../../assets/images/avatar.png" />
        </div>
      </div>
    </section>

    <Authentication
      :show-auth="showAuth"
      :close-auth="() => (showAuth = false)"
      :view-auth="viewAuth"
      :switch-form="(view: 'login' | 'register') => (viewAuth = view)"
    />
  </div>
</template>

<style lang="scss" module>
.landing {
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 16.4rem 15.2rem 2rem;

    .img {
      width: 77.9rem;
      height: 17.8rem;
    }

    .h1 {
      font-family: 'Inter-SemiBold';
      font-size: 6rem;
      line-height: 7.5rem;
      letter-spacing: -1px;
      text-align: center;
      color: $primary-700;
    }

    .h2 {
      @include text-1;
      text-align: center;
      color: $primary-600;
    }
  }

  .button-vacabulary-wrapper {
    text-align: center;
    padding: 5.7rem 0 12rem;

    .button {
      @include subheading-2;
      font-family: 'Inter-Regular';
      padding: 3.2rem;
      box-sizing: border-box;
      border-radius: 6rem;
      background-color: $primary-500;
      border: none;
      color: $neutrals-100;
      cursor: pointer;

      &:hover {
        background-color: $primary-600;
      }

      &:active {
        background-color: $primary-700;
      }
    }
  }
  .vocabulary-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 4rem;
    padding: 0 12rem 12rem;

    .left {
      position: relative;
      height: 56.4rem;
      width: 64.8rem;

      .img1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 29.5rem;
        height: 34.4rem;
      }

      .img2 {
        position: absolute;
        top: 12.3rem;
        left: 16.5rem;
        width: 29.5rem;
        height: 33.2rem;
      }

      .button {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
        align-items: center;
        justify-content: center;
        @include subheading-3;
        color: $primary-500;
        padding: 0 4rem;
        position: absolute;
        left: 36.3rem;
        top: 23.2rem;
        width: 28rem;
        height: 33.2rem;
        border-radius: $radius-xl;
        border: 0.1rem dashed $primary-300;
        background-color: $neutrals-100;
        cursor: pointer;

        &:hover {
          background-color: $primary-100;
        }
        &:active {
          background-color: $primary-200;
        }
      }
    }

    .right {
      width: 62.2rem;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      align-items: flex-end;
      .h2 {
        font-family: 'Inter-SemiBold';
        font-size: 4rem;
        line-height: 4.9rem;
        color: $primary-700;
      }
      .p {
        @include subheading-3;
        color: $neutrals-800;
        text-align: right;
      }

      .profile {
        display: flex;
        flex-direction: row;
        gap: 3.2rem;
        align-items: center;

        .langs {
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          list-style: none;
          gap: 2rem;
          width: max-content;

          .lang {
            display: flex;
            flex-direction: row;
            gap: 1.2rem;
            align-items: center;
            padding: 1.6rem 2rem;
            border-radius: 4rem;
            border: 0.1rem solid $neutrals-400;
            width: 100%;

            .lang-name {
              @include text-1;
              color: $neutrals-800;
            }
            .lang-words {
              @include text-2;
              color: $neutrals-600;
            }
          }
        }
      }

      .img {
        width: 16rem;
        height: 16rem;
      }
    }
  }
}
</style>
