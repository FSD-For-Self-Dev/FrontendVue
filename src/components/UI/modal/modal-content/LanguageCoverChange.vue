<script lang="ts">
import type { PropType } from 'vue';
import { useNotificationsStore } from '@/store/notifications';
import { mapActions, mapState } from 'pinia';
import { isAxiosError } from 'axios';
import { ref } from 'vue';
import { useLanguagesStore } from '@/store/languages';
import Button from '@/components/UI/button/Button.vue';
import WordTagCard from '@/components/vocabulary/WordTagCard.vue';
import type { LanguageCoverDto, LanguageDeleteCoverDto, LanguageSetCoverDto } from '@/dto/languages.dto';
import LanguageCoverItem from '@/components/language/LanguageCoverItem.vue';
import ImageUploadForm from '@/components/vocabulary/ImageUploadForm.vue';
import { useUserStore } from '@/store/user';
import { uploadFile } from '@/utils/uploadFileB64';

export default {
  components: {
    Button,
    WordTagCard,
    LanguageCoverItem,
    ImageUploadForm,
  },
  props: {
    closeForm: {
      type: Function,
      required: true,
    },
    objectLookup: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      submitProcess: false,
      imageFormOpen: false,
      newImage: '',
      cover_choices: [] as LanguageCoverDto[] | undefined,
      cover_id: '' as string,
      setData: {} as LanguageSetCoverDto,
      deleteData: {} as LanguageDeleteCoverDto,
    };
  },
  setup(props) {
    const objectLookup = ref(props.objectLookup);
    return {
      objectLookup,
    };
  },
  computed: {
    ...mapState(useUserStore, ['username']),
    languageObject() {
      return this.getLanguageObjectByIsocode(this.objectLookup);
    },
    getCoverImage() {
      try {
        return this.cover_choices?.filter((cover) => {
          return cover.id === this.cover_id;
        })[0].image;
      } catch {
        return this.newImage ? this.newImage : this.languageObject?.cover;
      }
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapActions(useLanguagesStore, [
      'getLearningLanguages',
      'setLanguageCover',
      'deleteLanguageCover',
      'getLanguageCovers',
      'getLanguageObjectByIsocode',
    ]),
    handleChoose(id: string) {
      this.setData = {
        'id': id
      };
      this.cover_id = id;
    },
    async handleSubmitNewImage(event: Event) {
      this.newImage = await uploadFile(event.target as HTMLInputElement);
      this.setData = {
        'image': this.newImage
      };
      this.imageFormOpen = false;
      this.cover_id = '';
    },
    async handleDeleteUploadedCover(id: string) {
      this.deleteData = {
        'id': id
      };
      this.cover_choices = this.cover_choices?.filter((cover) => {
        return cover.id !== id;
      });
    },
    async handleCoverChange() {
      this.submitProcess = true;
      if (this.deleteData['id']) {
        const res = await this.deleteLanguageCover(this.objectLookup, this.deleteData);
        if (isAxiosError(res)) {
          console.log(res.response?.data);
        };
      };
      if (this.setData['id'] || this.setData['image']) {
        const res = await this.setLanguageCover(this.objectLookup, this.setData);
        if (isAxiosError(res)) {
          console.log(res.response?.data);
        } else {
          await this.getLearningLanguages();
        };
      };
      this.closeForm();
      this.addNewMessage({
        type: 'info',
        text: this.$t('infoMessage.changesSaved'),
      });
      this.submitProcess = false;
    },
  },
  async mounted() {
    const lang_obj = this.languageObject;
    this.cover_id = lang_obj ? lang_obj.cover_id : '';

    if (this.objectLookup) {
      await this.getLanguageCovers(this.objectLookup);
      const { covers } = useLanguagesStore();
      this.cover_choices = covers;
    }
  },
};
</script>

<template>
  <form @submit.prevent="handleCoverChange" class="change-language-cover-form">
    <div class="language-cover">
      <img class="cover-image" :src="getCoverImage" />
    </div>
    <ImageUploadForm
      @change.stop="handleSubmitNewImage"
      v-if="imageFormOpen"
      style="margin-bottom: 2rem"
      :image="newImage"
    />
    <div class="cover-choices-list">
      <button
        v-if="!imageFormOpen && !newImage"
        class="cover-choices-list--add-cover-image"
        type="button"
        @click="
          imageFormOpen = true;
          newImage = '';
        "
      >
        <svg-icon
          name="AddIcon"
          size="nm"
          color="var:primary-500"
          style="stroke-width: 0.05rem; padding-left: 0"
        />
        <span>{{ $t('buttons.uploadImage') }}</span>
      </button>
      <LanguageCoverItem
        v-if="newImage"
        :image="newImage"
        :active="!cover_id"
        @click="
          imageFormOpen = true;
          newImage = '';
        "
      />
      <LanguageCoverItem
        v-for="cover in cover_choices"
        :image="cover.image"
        :active="cover.id === cover_id"
        @click="() => handleChoose(cover.id)"
        :deleteAllowed="cover.author === username && languageObject?.cover_id !== cover.id"
        :handleDelete="handleDeleteUploadedCover"
        :deleteId="cover.id"
      />
    </div>
    <div class="buttons">
      <Button
        type="button"
        variant="secondary"
        :text="$t('buttons.cancel')"
        size="medium"
        @click="() => closeForm()"
      />
      <div>
        <Button
          v-if="!submitProcess"
          type="submit"
          variant="primary"
          :text="$t('buttons.save')"
          size="medium"
        />
        <Button
          v-else
          type="submit"
          :text="$t('tip.saveProcceed')"
          size="medium"
          disabled
        />
      </div>
    </div>
  </form>
</template>

<style lang="scss">
.change-language-cover-form {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .language-cover {
    height: 19.4rem;
  }

  .cover-choices-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    max-height: 48rem;
    overflow: auto;
    @include scroll;
    padding: 0.5rem;

    &--add-cover-image {
      width: 19.6rem;
      height: 15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.2rem;
      @include subheading-4;
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

  .buttons {
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
  }
}
</style>
