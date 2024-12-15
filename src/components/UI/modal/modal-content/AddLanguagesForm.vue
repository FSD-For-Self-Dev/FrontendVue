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
      this.submitProcess = true;
      await this.postLearningLanguage(this.activeLanguage, this.$i18n.locale).then(async (res) => {
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
          await this.getAvailableLanguages(this.$i18n.locale);
        }
      });
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
