<script lang="ts">
import type { PropType } from 'vue';
import { useNotificationsStore } from '@/store/notifications';
import { mapActions, mapState } from 'pinia';
import { isAxiosError } from 'axios';
import { ref } from 'vue';
import { useLanguagesStore } from '@/store/languages';
import Button from '@/components/UI/button/Button.vue';
import WordTagCard from '@/components/vocabulary/WordTagCard.vue';
import type { LanguageCoverDto } from '@/dto/languages.dto';
import LanguageCoverItem from '@/components/language/LanguageCoverItem.vue';

export default {
  components: { Button, WordTagCard, LanguageCoverItem },
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
      cover_choices: [] as LanguageCoverDto[] | undefined,
      cover_id: '' as string,
    };
  },
  setup(props) {
    const objectLookup = ref(props.objectLookup);
    return {
      objectLookup,
    };
  },
  computed: {
    languageObject() {
      return this.getLanguageObjectByIsocode(this.objectLookup);
    },
    getCoverImage() {
      try {
        return this.cover_choices?.filter((cover) => {
          return cover.id === this.cover_id;
        })[0].image;
      } catch {
        return this.languageObject?.cover;
      }
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapActions(useLanguagesStore, [
      'getLearningLanguages',
      'setLanguageCover',
      'getLanguageCovers',
      'getLanguageObjectByIsocode',
    ]),
    handleChoose(id: string) {
      this.cover_id = this.cover_id === id ? '' : id;
    },
    async handleCoverChange() {
      this.submitProcess = true;
      const data = { image_id: this.cover_id };
      const res = await this.setLanguageCover(this.objectLookup, data);
      if (isAxiosError(res)) {
        console.log(res.response?.data);
      } else {
        await this.getLearningLanguages();
        this.closeForm();
        this.addNewMessage({
          type: 'info',
          text: this.$t('infoMessage.changesSaved'),
        });
      }
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
    <div class="cover-choices-list">
      <LanguageCoverItem
        v-for="cover in cover_choices"
        :image="cover.image"
        :active="cover.id === cover_id"
        @click="() => handleChoose(cover.id)"
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
  }

  .buttons {
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
  }
}
</style>
