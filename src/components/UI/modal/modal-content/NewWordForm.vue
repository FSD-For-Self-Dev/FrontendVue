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
import type {
  NewWordDto,
  WordTranslationDto,
  ImageAssociationsDto,
} from '@/dto/vocabulary.dto';
import { useNotificationsStore } from '@/store/notifications';
import { AxiosError, isAxiosError } from 'axios';
import { ref } from 'vue';
import { useBase64 } from '@vueuse/core';
import ImageUploadForm from '@/components/vocabulary/ImageUploadForm.vue';
import WordImageItem from '@/components/vocabulary/WordImageItem.vue';
import WordTranslationItem from '@/components/vocabulary/WordTranslationItem.vue';

export default {
  components: {
    Dropdown,
    Input,
    Button,
    Tab,
    IconButton,
    ImageUploadForm,
    WordImageItem,
    WordTranslationItem,
  },
  data(methods) {
    return {
      word: '',
      note: '',
      language: methods.getLastLanguage(),
      translations: [] as WordTranslationDto[],
      image_associations: [] as ImageAssociationsDto[],
      step: 1,
      tab: 1,
      translationFormOpen: false,
      newTranslation: '',
      newTranslationLanguage: '',
      editTranslation: '',
      editTranslationLanguage: '',
      imageFormOpen: false,
      newImage: '',
      newImageUrl: '',
      editImage: '',
      editIndex: undefined as number | undefined,
      submitProcess: false,
    };
  },
  setup() {
    const onDrag = ref(false);
    return {
      onDrag,
    };
  },
  props: {
    closeForm: {
      type: Function,
      required: true,
    },
    updateTitle: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapState(useVocabularyStore, ['count']),
    ...mapState(useLanguagesStore, ['learning_languages', 'all_languages']),
    emptyImage(): string {
      return new URL(`/src/assets/images/emptyImage.svg`, import.meta.url).href;
    },
  },
  methods: {
    ...mapActions(useVocabularyStore, ['createWord', 'getVocabulary']),
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapState(useVocabularyStore, ["words"]),
    getLastLanguage() {
      try {return this.words()[0].language;} catch (error) {return ''};
    },
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
      this.newTranslation = '';
      this.newTranslationLanguage = '';
      this.editTranslation = '';
      this.editTranslationLanguage = '';
      this.translationFormOpen = false;
      this.imageFormOpen = false;
      this.newImage = '';
      this.newImageUrl = '';
      this.editImage = '';
      this.image_associations = [];
      this.editIndex = undefined;
    },
    async handleSubmitNewTranslation() {
      if (typeof this.editIndex != 'undefined') {
        let translations_updated = this.translations.slice(0, this.editIndex);
        translations_updated.push({
          text: this.newTranslation,
          language: this.newTranslationLanguage,
        });
        translations_updated.push(...this.translations.slice(this.editIndex + 1));
        this.translations = translations_updated;
      } else {
        this.translations.push({
          text: this.newTranslation,
          language: this.newTranslationLanguage,
        });
      }
      this.newTranslation = '';
      this.newTranslationLanguage = '';
      this.editTranslation = '';
      this.editTranslationLanguage = '';
      this.translationFormOpen = false;
    },
    async handleEditTranslation(
      translationText: string,
      translationLanguage: string,
      index: number,
    ) {
      this.editTranslation = translationText;
      this.editTranslationLanguage = translationLanguage;
      this.editIndex = index;
      this.newTranslation = translationText;
      this.newTranslationLanguage = translationLanguage;
      this.translationFormOpen = true;
    },
    async handleDeleteTranslation(index: number) {
      let translations_updated = this.translations.slice(0, index);
      translations_updated.push(...this.translations.slice(index + 1));
      this.translations = translations_updated;
    },
    async handleCloseTranslationForm() {
      this.translationFormOpen = false;
      this.newTranslation = '';
      this.newTranslationLanguage = '';
    },
    async handleSubmitNewImage(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files) {
        const base64 = useBase64(files[0]);
        this.newImage = await base64.promise.value;
      }

      if (typeof this.editIndex != 'undefined') {
        let image_associations_updated = this.image_associations.slice(0, this.editIndex);
        image_associations_updated.push({
          image: this.newImage,
          image_url: this.newImageUrl,
        });
        image_associations_updated.push(
          ...this.image_associations.slice(this.editIndex + 1),
        );
        this.image_associations = image_associations_updated;
      } else {
        this.image_associations.push({
          image: this.newImage,
          image_url: this.newImageUrl,
        });
      }

      this.imageFormOpen = false;
      this.newImage = '';
      this.newImageUrl = '';
      this.editImage = '';
      this.editIndex = undefined;
    },
    async handleEditImage(image: string, index: number) {
      this.editImage = image;
      this.editIndex = index;
      this.imageFormOpen = true;
    },
    async handleDeleteImage(index: number) {
      let image_associations_updated = this.image_associations.slice(0, index);
      image_associations_updated.push(...this.image_associations.slice(index + 1));
      this.image_associations = image_associations_updated;
    },
    async changeTab(tab: number) {
      this.editImage = '';
      this.editTranslation = '';
      this.editIndex = undefined;
      this.newImage = '';
      this.newImageUrl = '';
      this.newTranslation = '';
      this.imageFormOpen = false;
      this.translationFormOpen = false;
      this.tab = tab;
    },
    async submitForm() {
      this.submitProcess = true;
      const data: NewWordDto = {
        text: this.word,
        language: this.language,
        translations: this.translations,
        image_associations: this.image_associations,
        note: this.note,
      };
      const res = await this.createWord(data);
      if (isAxiosError(res)) {
        if (res.response?.status === 409) {
          this.addNewMessage({
            type: 'error',
            text: 'Слово уже было добавлено в словарь',
          });
        } else {
          console.log(res.response?.data);
        }
      } else {
        await this.getVocabulary();
        this.handleClose();
        this.addNewMessage({
          type: 'info',
          text: 'Слово успешно добавлено в словарь',
        });
      }
      this.submitProcess = false;
    },
  },
};
</script>

<template>
  <div class="vocabulary-modal">
    <form class="vocabulary-modal--form" @submit.prevent="submitForm">
      <div v-if="step === 1" class="vocabulary-modal--step1">
        <Dropdown
          placeholder="Изучаемый язык"
          v-model="language"
          :items="
            learning_languages.map((lang) => {
              return {
                value: lang.language.name,
                label: lang.language.name_local,
                icon: lang.language.flag_icon,
              };
            })
          "
          style="padding-inline: 2.8rem"
        />
        <Input v-model="word" placeholder="Введите слово или фразу..." size="standart" />
        <Input show-label v-model="note" label="Заметка" />
      </div>

      <div v-if="step === 2">
        <h3 class="vocabulary-modal--word">{{ word }}</h3>

        <div class="vocabulary-modal--tabs">
          <Tab :active="tab === 1" @click="() => changeTab(1)" title="Переводы" />
          <Tab :active="tab === 2" @click="() => changeTab(2)" title="Ассоциации" />
        </div>

        <div v-if="tab === 1">
          <p class="vocabulary-modal--info-tip">
            <svg-icon name="TranslationIcon" size="md" color="var:primary-700" />
            Переводите слово или фразу на родной язык или другой изучаемый
          </p>
          <div v-if="translationFormOpen" class="vocabulary-modal--translation-form">
            <Dropdown
              placeholder="Язык перевода"
              v-model="newTranslationLanguage"
              :items="
                all_languages.map((lang) => {
                  return {
                    value: lang.name,
                    label: lang.name_local,
                    icon: lang.flag_icon,
                  };
                })
              "
              style="padding-inline: 2.8rem"
            />
            <div class="vocabulary-modal--translation-form-input">
              <Input
                style="width: 100%"
                v-model="newTranslation"
                placeholder="Введите перевод..."
              />
              <IconButton
                icon="ConfirmIcon"
                size="lg"
                type="button"
                @click="handleSubmitNewTranslation"
              />
              <IconButton
                icon="CloseIcon"
                size="lg"
                iconSize="nm"
                type="button"
                @click="translationFormOpen = false"
              />
            </div>
          </div>
          <div class="vocabulary-modal--translations">
            <button
              v-if="!translationFormOpen || editTranslation"
              class="vocabulary-modal--add-translation"
              type="button"
              @click="
                translationFormOpen = true;
                editTranslation = '';
              "
            >
              <svg-icon
                name="AddIcon"
                size="md"
                color="var:primary-500"
                style="stroke-width: 0.05rem; padding-left: 0"
              />
              <span>Добавить перевод</span>
            </button>
            <WordTranslationItem
              :translation-text="translation.text"
              :translation-language="translation.language"
              :editIndex="index"
              v-for="(translation, index) in translations"
              :handleEdit="handleEditTranslation"
              :handleDelete="handleDeleteTranslation"
            />
          </div>
        </div>

        <div v-if="tab === 2">
          <p class="vocabulary-modal--info-tip">
            <svg-icon name="AssociationIcon" size="md" color="var:primary-700" />
            Добавьте свои ассоциации с этим словом
          </p>
          <ImageUploadForm
            @change.stop="handleSubmitNewImage"
            v-if="imageFormOpen"
            style="margin-bottom: 2rem"
            :image="editImage"
          />
          <div class="vocabulary-modal--images">
            <button
              v-if="!imageFormOpen || editImage"
              class="vocabulary-modal--add-image"
              type="button"
              @click="
                imageFormOpen = true;
                editImage = '';
              "
            >
              <svg-icon
                name="AddIcon"
                size="nm"
                color="var:primary-500"
                style="stroke-width: 0.05rem; padding-left: 0"
              />
              <span>Добавить ассоциацию</span>
            </button>
            <WordImageItem
              :image="image.image"
              :editIndex="index"
              v-for="(image, index) in image_associations"
              :handleEdit="handleEditImage"
              :handleDelete="handleDeleteImage"
            />
          </div>
        </div>
      </div>

      <div v-if="step === 1" class="vocabulary-modal--footer">
        <div></div>
        <Button size="medium" variant="secondary" text="Отменить" @click="handleClose" />
        <Button
          size="medium"
          text="Далее"
          @click="handleNext"
          :disabled="word.length === 0 || language.length === 0"
        />
      </div>
      <div v-else class="vocabulary-modal--footer">
        <div class="left-buttons">
          <Button
            size="medium"
            variant="secondary"
            text="Отменить"
            @click="handleClose"
          />
        </div>
        <Button size="medium" text="Назад" variant="secondary" @click="handlePrev" />
        <div>
          <Button v-if="!submitProcess" size="medium" type="submit" text="Сохранить" />
          <Button v-else size="medium" text="Сохраняем..." disabled />
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.vocabulary-modal {
  &--step1 {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &--footer {
    display: flex;
    justify-content: right;
    gap: 1.6rem;
    padding-top: 4rem;

    .left-buttons {
      width: 100%;
      display: flex;
      justify-content: left;
    }
  }

  &--word {
    @include subheading-2;
    color: $neutrals-900;
    padding-bottom: 4rem;
  }

  &--tabs {
    display: flex;
    gap: 0.8rem;
    padding-bottom: 3.8rem;
  }

  &--info-tip {
    color: $primary-700;
    display: flex;
    gap: 1.2rem;
    align-items: center;
    padding-bottom: 3.6rem;
  }

  .vocabulary-modal--translation-form {
    width: 100%;
    height: 22rem;
    padding: 4rem;
    border: 0.1rem solid $neutrals-400;
    border-radius: $radius-xs;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;

    .vocabulary-modal--translation-form-input {
      display: flex;
      gap: 1.2rem;
      width: 100%;
    }
  }

  &--translations {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-height: 40rem;
    overflow-y: auto;
    @include scroll;
  }

  &--add-translation {
    width: 26rem;
    height: 12rem;
    padding: 2rem;
    border: 0.1rem dashed $primary-300;
    border-radius: $radius-xl;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    background-color: $neutrals-100;
    @include subheading-4;
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

  &--images {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-height: 54.4rem;
    overflow-y: auto;
    @include scroll;
    padding-block: 0.2rem;
  }

  &--add-image {
    width: 26rem;
    height: 26rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.2rem;
    @include subheading-3;
    color: $primary-500;
    background-color: $neutrals-100;
    border: 0.1rem dashed $primary-400;
    border-radius: $radius-xl;
    padding-inline: 2rem;
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
