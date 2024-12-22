<script lang="ts">
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState } from 'pinia';
import { useNotificationsStore } from '@/store/notifications';
import type { LanguageDto } from '@/dto/languages.dto';
import Button from '@/components/UI/button/Button.vue';
import Input from '@/components/UI/input/Input.vue';
import { isAxiosError } from 'axios';
import Search from '@/components/language/Search.vue';
import Counter from '../../counter/Counter.vue';
import LanguageAddItem from '@/components/language/LanguageAddItem.vue';

export default {
  components: { Input, Button, Search, Counter, LanguageAddItem },
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
      submitProcess: false,
    };
  },
  computed: {
    ...mapState(useLanguagesStore, ['available_languages']),
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
    toggleActiveLanguage(language: LanguageDto) {
      if (this.activeLanguage.includes(language)) {
        this.activeLanguage = this.activeLanguage.filter((item) => {
          return item.isocode !== language.isocode
        });
      } else {
        this.activeLanguage.push(language);
      }
    },
    clearActiveLanguages() {
      this.activeLanguage.length = 0;
    },
    async handleSave() {
      this.submitProcess = true;
      const res = await this.postLearningLanguage(this.activeLanguage);
      if (isAxiosError(res)) {
        if (res.response?.status === 409) {
          this.addNewMessage({
            type: 'error',
            text: this.$t('errorMessage.languagesAmountLimit'),
          });
        }
        return;
      } else {
        this.closeForm();
        const lenLanguages = this.activeLanguage.length;
        this.addNewMessage({
          type: 'info',
          text: this.$t('infoMessage.newLanguagesAdded', lenLanguages, { named: { n: lenLanguages } }),
        });
        await this.getAvailableLanguages();
      };
      this.submitProcess = false;
    },
  },
};
</script>

<template>
  <form class="languages-form" @submit.prevent="() => handleSave()">
    <Search v-model="searchLanguage" />
    <div class="languages-from--counters-info">
      <span class="languages-form--available-info">
        {{ $t('counter.languages', filteredLanguages.length, { named: { n: filteredLanguages.length } }) }}
      </span>
      <Counter
        :value="activeLanguage.length"
        :clear-active-items="clearActiveLanguages"
      />
    </div>
    <div class="languages-form--list">
      <LanguageAddItem
        :language="language"
        v-for="language in filteredLanguages"
        @toggle-active-language="toggleActiveLanguage"
        :active="activeLanguage.includes(language)"
        variant="short"
      />
    </div>
    <div class="languages-form--actions">
      <Button
        :text="$t('buttons.cancel')"
        variant="secondary"
        size="medium"
        @click="() => closeForm()"
      />
      <Button
        v-if="!submitProcess"
        :text="$t('buttons.add')"
        variant="primary"
        size="medium"
        type="submit"
        :disabled="activeLanguage.length === 0"
      />
      <Button
        v-else
        size="medium"
        :text="$t('tip.saveProcceed')"
        disabled
      />
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
  }

  .languages-form--actions {
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
    padding-top: 4rem;
  }
}
</style>
