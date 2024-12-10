<script lang="ts">
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState } from 'pinia';
import { numWord } from '@/utils/numWord';
import { useNotificationsStore } from '@/store/notifications';
import type { LanguageDto } from '@/dto/languages.dto';
import Button from '@/components/UI/button/Button.vue';
import Input from '@/components/UI/input/Input.vue';
import { isAxiosError } from 'axios';
import Search from '@/components/language/Search.vue';
import Counter from '../../counter/Counter.vue';

export default {
  components: { Input, Button, Search, Counter },
  props: {
    closeForm: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      searchLanguage: '',
      activeLanguage: [] as LanguageDto[],
    };
  },
  computed: {
    ...mapState(useLanguagesStore, ['available_languages']),
    count() {
      return this.filteredLanguages.length;
    },
    available_info() {
      return (
        numWord(this.count, ['Доступен ', 'Доступно ', 'Доступно ']) +
        this.count +
        numWord(this.count, [' язык', ' языка', ' языков'])
      );
    },
    filteredLanguages() {
      return this.available_languages.filter((lang) => {
        return (
          lang.name.toLowerCase().includes(this.searchLanguage.toLowerCase()) ||
          lang.name_local.toLowerCase().includes(this.searchLanguage.toLowerCase())
        );
      });
    },
  },
  methods: {
    ...mapActions(useLanguagesStore, ['postLearningLanguage', 'getAvailableLanguages']),
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    toggleActiveLanguage(lang: LanguageDto) {
      if (this.activeLanguage.includes(lang)) {
        this.activeLanguage = this.activeLanguage.filter((item) => item.id !== lang.id);
      } else {
        this.activeLanguage.push(lang);
      }
    },
    clearActiveLanguages() {
      this.activeLanguage.length = 0;
    },
    async handleSave() {
      const res = await this.postLearningLanguage(this.activeLanguage, this.$i18n.locale);
      if (isAxiosError(res)) {
        if (res.response?.status === 409) {
          this.addNewMessage({
            type: 'error',
            text: 'Максимальное количество изучаемых языков',
          });
        }

        return;
      }
      const lenWords = this.activeLanguage.length;
      const addWord = numWord(lenWords, ['Добавлен', 'Добавлено', 'Добавлено']);
      const learnWord = numWord(lenWords, ['изучаемый', 'изучаемых', 'изучаемых']);
      const langWord = numWord(lenWords, ['язык', 'языка', 'языков']);
      this.addNewMessage({
        type: 'info',
        text: `${addWord} ${lenWords} ${learnWord} ${langWord}`,
      });

      await this.getAvailableLanguages(this.$i18n.locale);
      this.closeForm();
    },
    handleWheel(event: WheelEvent) {
      const container = event.currentTarget as HTMLElement;
      event.preventDefault();
      container.scrollTop += event.deltaX;
    },
  },
};
</script>

<template>
  <form class="languages-form" @submit.prevent="() => handleSave()">
    <Search v-model="searchLanguage" />
    <div class="languages-from--counters-info">
      <span class="languages-form--available-info">{{ available_info }} </span>
      <Counter
        :value="activeLanguage.length"
        :clear-active-items="clearActiveLanguages"
      />
    </div>
    <div class="languages-form--list" @wheel.prevent="handleWheel">
      <div
        class="languages-form--list-item"
        @click="() => toggleActiveLanguage(lang)"
        :class="activeLanguage.includes(lang) && 'active'"
        v-for="lang in filteredLanguages"
        :key="lang.id"
      >
        <img :src="lang.flag_icon" />
        <span>{{ lang.name_local }}</span>
      </div>
    </div>
    <div class="languages-form--actions">
      <Button
        text="Отменить"
        variant="secondary"
        size="medium"
        @click="() => closeForm()"
      />
      <Button text="Добавить" variant="primary" size="medium" type="submit" />
    </div>
  </form>
</template>

<style lang="scss">
.languages-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .languages-from--counters-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.6rem;
  }

  .languages-form--available-info {
    @include tag-big;
    color: $neutrals-600;
    text-transform: uppercase;
  }

  .languages-form--list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    overflow-y: auto;
    max-height: 18.4rem;
    @include scroll;

    .languages-form--list-item {
      @include text-2;
      color: $neutrals-900;
      width: 17.5rem;
      height: 4.8rem;
      border: 0.1rem solid $neutrals-400;
      border-radius: 1.2rem;
      padding: 1.2rem 1.6rem;
      display: flex;
      gap: 1.2rem;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: $primary-200;
        border-color: $primary-200;
      }

      &:active {
        background-color: $primary-300;
        border-color: $primary-300;
      }

      &.active {
        background-color: $primary-300;
        border-color: $primary-300;
      }
    }
  }

  .languages-form--actions {
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
    padding-top: 4rem;
  }
}
</style>
