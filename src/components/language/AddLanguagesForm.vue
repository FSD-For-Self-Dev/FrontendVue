<script lang="ts">
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState } from 'pinia';
import { numWord } from '@/utils/numWord';
import { useNotificationsStore } from '@/store/notifications';
import type { LanguageDto } from '@/dto/languages.dto';
import Button from '@/components/UI/button/Button.vue';
import Input from '@/components/UI/input/Input.vue';
import { isAxiosError } from 'axios';

export default {
  props: {
    closeForm: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      searchWord: '',
      activeLanguage: [] as LanguageDto[]
    }
  },
  components: { Input, Button },
  computed: {
    ...mapState(useLanguagesStore, ['available_languages']),
    count() {
      return this.filteredLanguages.length;
    },
    available_info() {
      return numWord(this.count, ['Доступен ', 'Доступно ', 'Доступно ']) + this.count + numWord(this.count, [' язык', ' языка', ' языков']);
    },
    filteredLanguages() {
      return this.available_languages.filter((lang) => {
        return lang.name.toLowerCase().includes(this.searchWord.toLowerCase()) ||
          lang.name_local.toLowerCase().includes(this.searchWord.toLowerCase())
      });
    }
  },
  methods: {
    ...mapActions(useLanguagesStore, ["postLearningLanguage", "getAvailableLanguages"]),
    ...mapActions(useNotificationsStore, ["addNewMessage"]),
    toggleActiveLanguage(lang: LanguageDto) {
      if (this.activeLanguage.includes(lang)) {
        this.activeLanguage = this.activeLanguage.filter((item) => item.id !== lang.id);
      } else {
        this.activeLanguage.push(lang);
      }
    },
    async handleSave() {
      const res = await this.postLearningLanguage(this.activeLanguage);
      if (isAxiosError(res)) {
        if (res.response?.status === 409) {
          this.addNewMessage({ type: 'error', text: 'Максимальное количество изучаемых языков' });
        }

        return;
      }
      const lenWords = this.activeLanguage.length;
      const addWord = numWord(lenWords, ['Добавлен', 'Добавлено', 'Добавлено'])
      const learnWord = numWord(lenWords, ['изучаемый', 'изучаемых', 'изучаемых']);
      const langWord = numWord(lenWords, ['язык', 'языка', 'языков']);
      this.addNewMessage({ type: 'info', text: `${addWord} ${lenWords} ${learnWord} ${langWord}` })

      await this.getAvailableLanguages();
      this.closeForm();
    }
  }
}
</script>

<template>
  <form class="languages-form" @submit.prevent="() => handleSave()">
    <Input v-model="searchWord" placeholder="Найти язык..." />
    <div>
      <span class="languages-form--available-info">{{ available_info }} </span>
    </div>
    <div class="languages-form--list">
      <div class="languages-form--list-item" @click="() => toggleActiveLanguage(lang)"
        :class="activeLanguage.includes(lang) && 'active'" v-for="lang in filteredLanguages" :key="lang.id">
        <img :src="lang.flag_icon" />
        <span>{{ lang.name_local }}</span>
      </div>
    </div>
    <div class="languages-form--actions">
      <Button text="Отмена" variant="secondary" size="medium" @click="() => closeForm()" />
      <Button text="Сохранить" variant="primary" size="medium" type="submit" />
    </div>
  </form>
</template>

<style lang="scss">
.languages-form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .languages-form--available-info {
    @include tag-big;
    color: $neutrals-600;
    text-transform: uppercase;

    padding: 2rem 0;
  }

  .languages-form--list {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 2rem;

    .languages-form--list-item {
      @include text-2;
      color: $neutrals-900;
      width: 17.5rem;
      border: 1px solid $neutrals-400;
      border-radius: 1.2rem;
      padding: 1.2rem 1.6rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      cursor: pointer;
      user-select: none;

      &:hover {
        border: 1px solid $primary-300;
      }

      &:active {
        border: 1px solid $primary-500;
      }

      &.active {
        background-color: $primary-200;
      }
    }
  }

  .languages-form--actions {
    display: flex;
    gap: 1.2rem;
    justify-content: flex-end;
    padding-top: 4rem;
  }
}
</style>