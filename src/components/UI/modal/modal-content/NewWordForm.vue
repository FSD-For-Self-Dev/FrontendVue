<script lang="ts">
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { mapActions, mapState } from 'pinia';
import type { DropdownItem } from '@/types/components/dropdown';
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import Input from '@/components/UI/input/Input.vue';
import Button from '@/components/UI/button/Button.vue';
import Tab from '@/components/UI/tab/Tab.vue';
import IconButton from '@/components/UI/button/IconButton.vue';
import type { NewWordDto, WordTranslationDto } from '@/dto/vocabulary.dto';
import { useNotificationsStore } from '@/store/notifications';
import { AxiosError, isAxiosError } from 'axios';

export default {
  components: { Dropdown, Input, Button, Tab, IconButton },
  data() {
    return {
      word: '',
      note: '',
      language: '',
      translations: [] as WordTranslationDto[],
      step: 1,
      tab: 1,
      translationFormOpen: false,
      newTranslation: '',
      newTranslationLanguage: '',
    }
  },
  props: {
    closeForm: {
      type: Function,
      required: true
    },
    updateTitle: {
      type: Function,
      default: () => { }
    }
  },
  computed: {
    ...mapState(useVocabularyStore, ["count", "words"]),
    ...mapState(useLanguagesStore, ["learning_languages", 'available_languages'])
  },
  methods: {
    ...mapActions(useVocabularyStore, ['createWord', 'getVocabulary']),
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    handleNext() {
      if (this.step === 1) {
        this.updateTitle('Кастомизируйте новое слово, чтобы лучше его запомнить');
      }
      this.step++;
    },
    handlePrev() {
      if (this.step === 2) {
        this.updateTitle('Новое слово');
      }
      this.step--;
    },
    handleClose() {
      this.closeForm();
      this.word = '';
      this.note = '';
      this.language = '';
      this.step = 1;
      this.tab = 1;
      this.translations = [];
      this.translationFormOpen = false;
      this.newTranslation = '';
      this.newTranslationLanguage = '';
    },
    handleSubmitNewTranslation() {
      this.translations.push({
        text: this.newTranslation,
        language: this.newTranslationLanguage
      });
      this.newTranslation = '';
      this.newTranslationLanguage = '';
      this.translationFormOpen = false;
    },
    handleCloseTranslationForm() {
      this.translationFormOpen = false;
      this.newTranslation = '';
      this.newTranslationLanguage = '';
    },
    async submitForm() {
      const data: NewWordDto = {
        text: this.word,
        language: this.language,
        translations: this.translations,
        note: this.note,
      }

      const res = await this.createWord(data);
      if (isAxiosError(res)) {
        if (res.response?.status === 409) {
          this.addNewMessage({
            type: 'error',
            text: 'Слово уже было добавлено в словарь'
          })
        }
      } else {
        await this.getVocabulary();
        this.handleClose();
        this.addNewMessage({
          type: 'info',
          text: 'Слово успешно добавлено в словарь'
        });
      }
    }
  }
}
</script>

<template>
  <div class="vocabulary-modal">
    <form class="vocabulary-modal--form" @submit.prevent="() => submitForm()">
      <div v-if="step === 1" class="vocabulary-modal--step1">
        <Dropdown placeholder="Изучаемый язык"
          v-model="language" :items="learning_languages.map((lang) => {
            return {
              value: lang.language.name,
              label: lang.language.name_local,
              icon: lang.language.flag_icon
            }
          })" style="padding-inline: 2.8rem;" />
        <Input v-model="word" placeholder="Введите слово или фразу..." size="standart" />
        <Input show-label v-model="note" label="Заметка" />
      </div>

      <div v-if="step === 2">
        <h3 class="vocabulary-modal--word">{{ word }}</h3>

        <div class="vocabulary-modal--tabs">
          <Tab :active="tab === 1" @click="tab = 1" title="Переводы" />
          <Tab :active="tab === 2" @click="tab = 2" title="Ассоциации" />
        </div>

        <div v-if="tab === 1">
          <p class="vocabulary-modal--note">
            <svg-icon name="TranslationIcon" size="md" color="var:primary-700" />
            Переводите слово или фразу на родной язык или другой изучаемый
          </p>
          <div class="vocabulary-modal--translations">
            <button v-if="!translationFormOpen" class="vocabulary-modal--add-translation" type="button"
              @click="translationFormOpen = true">
              <svg-icon name="AddIcon" size="sm" color="var:primary-500" style="stroke-width: 0.02rem; padding-left: 0;" />
              <span>Добавить перевод</span>
            </button>
            <div v-if="translationFormOpen" class="vocabulary-modal--translation-form">
              <Dropdown placeholder="Язык перевода"
                v-model="newTranslationLanguage" :items="available_languages.map((lang) => {
                  return {
                    value: lang.name,
                    label: lang.name_local,
                    icon: lang.flag_icon
                  }
              })" style="padding-inline: 2.8rem;" />
              <div class="vocabulary-modal--translation-form-input">
                <Input style="width: 61rem;" v-model="newTranslation" placeholder="Введите перевод..." />
                <IconButton icon="ConfirmIcon" size="lg" type="button" @click="handleSubmitNewTranslation" />
                <IconButton icon="CloseIcon" size="lg" iconSize="nm" type="button" @click="translationFormOpen = false" />
              </div>
            </div>
            <div v-for="transition in translations" class="vocabulary-modal--translations-item">
              {{ transition.text }}
            </div>
          </div>

        </div>


        <div v-if="tab === 2">
          <p class="vocabulary-modal--note">
            <svg-icon name="AssociationIcon" size="md" color="var:primary-700" />
            Добавьте свои ассоциации с этим словом
          </p>
        </div>
      </div>
      <div v-if="step === 1" class="vocabulary-modal--footer">
        <div></div>
        <Button size="medium" variant="secondary" text="Отменить" @click="handleClose" />
        <Button size="medium" text="Далее" @click="handleNext"
          :disabled="word.length === 0 || language.length === 0" />
      </div>
      <div v-else class="vocabulary-modal--footer">
        <div class="left-buttons">
          <Button size="medium" variant="secondary" text="Отменить" @click="handleClose" />
        </div>
        <Button size="medium" text="Назад" variant="secondary" @click="handlePrev" />
        <Button size="medium" type="submit" text="Сохранить" />
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.vocabulary-modal {
  .vocabulary-modal--step1 {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .vocabulary-modal--footer {
    display: flex;
    justify-content: right;
    gap: 1.2rem;
    padding-top: 4rem;

    .left-buttons {
      width: 100%;
      display: flex;
      justify-content: left;
    }
  }

  .vocabulary-modal--word {
    @include subheading-2;
    color: $neutrals-900;
    padding-bottom: 4rem;
  }

  .vocabulary-modal--tabs {
    display: flex;
    gap: .8rem;
    padding-bottom: 3.8rem;
  }

  .vocabulary-modal--note {
    color: $primary-700;
    display: flex;
    gap: 1.2rem;
    align-items: center;
    padding-bottom: 3.6rem;
  }

  .vocabulary-modal--translations {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-height: 40rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: .4rem;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: $radius-lg;
      background-color: $neutrals-400;
    }

    .vocabulary-modal--translation-form {
      width: 100%;
      height: 22rem;
      padding: 4rem;
      border: .1rem solid $neutrals-400;
      border-radius: $radius-xs;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .vocabulary-modal--translation-form-input {
        display: flex;
        gap: 1.2rem;
        width: 100%;
      }
    }

    .vocabulary-modal--translations-item {
      width: 26rem;
      height: 12rem;
      padding: 2rem;
      border: .1rem solid $neutrals-400;
      border-radius: $radius-xl;
      background-color: $neutrals-100;
      @include subheading-4;
      color: $neutrals-900;
    }
  }

  .vocabulary-modal--add-translation {
    width: 26rem;
    height: 12rem;
    padding: 2rem;
    border: 0.1rem dashed $primary-300;
    border-radius: $radius-xl;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    background-color: $neutrals-100;
    @include text-2;
    color: $primary-500;
    cursor: pointer;

    &:hover {
      background-color: $primary-100;
      border-color: $primary-500;
    }

    &:active {
      background-color: $primary-200;
      border-color: $primary-500;
    }
  }
}
</style>
