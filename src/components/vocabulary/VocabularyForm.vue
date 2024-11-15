<script lang="ts">
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { mapActions, mapState } from 'pinia';
import type { DropdownItem } from '@/types/components/dropdown';
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import Input from '@/components/UI/input/Input.vue';
import Button from '@/components/UI/button/Button.vue';
import Tab from '@/components/UI/tab/Tab.vue';
import CircleButton from '@/components/UI/circle-button/CircleButton.vue';
import TranslationIcon from '@/assets/icons/vocabulary/TranslationIcon.vue';
import AssociationIcon from '@/assets/icons/vocabulary/AssociationIcon.vue';
import AddIcon from '@/assets/icons/actions/AddIcon.vue';
import ConfirmIcon from '@/assets/icons/actions/ConfirmIcon.vue';
import CloseIcon from '@/assets/icons/actions/CloseIcon.vue';
import type { WordDto, WordTranslationDto } from '@/dto/vocabulary.dto';
import { useInfoMessagesStore } from '@/store/info-message';
import { AxiosError, isAxiosError } from 'axios';

export default {
  components: { Dropdown, Input, Button, Tab, TranslationIcon, AssociationIcon, AddIcon, CircleButton, ConfirmIcon, CloseIcon },
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
    ...mapActions(useInfoMessagesStore, ['addNewMessage']),
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
      const data: WordDto = {
        text: this.word,
        language: this.language,
        translations: this.translations,
        note: this.note
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
        <Dropdown :placeholder="learning_languages.length === 0 ? 'Нет изучаемых языков' : 'Изучаемый язык'"
          v-model="language" :items="learning_languages.map((lang) => {
            return {
              value: lang.language.name,
              label: lang.language.name_local,
              icon: lang.language.flag_icon
            }
          })" />
        <Input v-model="word" placeholder="Введите слово или фразу..." />
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
            <TranslationIcon size="24" />
            Переводите слово или фразу на родной язык или другой изучаемый
          </p>
          <div class="vocabulary-modal--translations">
            <button v-if="!translationFormOpen" class="vocabulary-modal--add-translation" type="button"
              @click="translationFormOpen = true">
              <AddIcon size="16" />
              <span>Добавить перевод</span>
            </button>
            <div v-if="translationFormOpen" class="vocabulary-modal--translation-form">
              <Dropdown v-model="newTranslationLanguage" :items="available_languages.map((lang) => {
                return {
                  value: lang.name,
                  label: lang.name_local,
                  icon: lang.flag_icon
                }
              })" />
              <div class="vocabulary-modal--translation-form-input">
                <Input style="width: 61rem;" v-model="newTranslation" placeholder="Введите перевод..." />
                <CircleButton type="button" @click="handleSubmitNewTranslation">
                  <ConfirmIcon size="32" />
                </CircleButton>
                <CircleButton type="button" @click="translationFormOpen = false">
                  <CloseIcon size="32" />
                </CircleButton>
              </div>
            </div>
            <div v-for="transition in translations" class="vocabulary-modal--translations-item">
              {{ transition.text }}
            </div>
          </div>

        </div>


        <div v-if="tab === 2">
          <p class="vocabulary-modal--note">
            <AssociationIcon size="24" />
            Добавьте свои ассоциации с этим словом
          </p>
        </div>
      </div>
      <div class="vocabulary-modal--footer">
        <div v-if="step === 1"></div>
        <Button size="medium" variant="secondary" type="button" @click="handleClose">Отменить</Button>
        <Button v-if="step === 2" size="medium" type="button" variant="secondary" @click="handlePrev">Назад</Button>
        <Button v-if="step === 1" size="medium" type="button" @click="handleNext"
          :disabled="word.length === 0 || language.length === 0">Далее</Button>
        <Button v-if="step === 2" size="medium" type="submit">Сохранить</Button>
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
    display: grid;
    grid-template-columns: 56.4rem max-content max-content;
    gap: 1.2rem;
    padding-top: 2.8rem;
  }

  .vocabulary-modal--word {
    font-family: 'Inter';
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 2.8rem;
    padding: 4rem 0;
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
      font-family: 'Inter';
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2rem;
    }
  }

  .vocabulary-modal--add-translation {
    width: 26rem;
    height: 12rem;
    padding: 2rem;
    color: $primary-500;
    border: 0.1rem dashed $primary-300;
    border-radius: $radius-xl;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    background-color: $neutrals-100;
    font-family: 'Inter';
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    cursor: pointer;

    &:hover {
      background-color: $primary-100;
    }

    &:active {
      background-color: $primary-200;
    }
  }
}
</style>