<script lang="ts">
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import Button from '@/components/UI/button/Button.vue';
import type { UserDto } from '@/dto/user.dto';
import { useUserStore } from '@/store/user';
import { mapActions, mapState } from 'pinia';
import { ref } from 'vue';
import { useWindowScroll } from '@vueuse/core';
import { useNotificationsStore } from '@/store/notifications';
import { isAxiosError } from 'axios';
import { useLanguagesStore } from '@/store/languages';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { Dropdown, Button },
  setup() {
    const { interface_language } = useUserStore();

    const formInterfaceLang = ref(interface_language);

    return {
      interface_language,
      formInterfaceLang,
    };
  },
  computed: {
    ...mapState(useLanguagesStore, ['global_languages']),
  },
  methods: {
    ...mapActions(useUserStore, ['patchUser']),
    ...mapActions(useNotificationsStore, ["addNewMessage"]),
    async handleSubmit() {
      const data: UserDto = {
        interface_language: this.formInterfaceLang,
      };
      const res = await this.patchUser(data);
      if (isAxiosError(res)) {
          console.log(res.response?.data);
        } else {
          this.$i18n.locale = this.formInterfaceLang;
          localStorage.setItem('locale', this.formInterfaceLang);
          this.addNewMessage({
            type: 'info',
            text: this.$t('infoMessage.changesSaved'),
          });
        }
    },
    async cancelChanges() {
      y.value = 0;
      this.formInterfaceLang = this.interface_language;
    },
    getLanguageName(neededLang: string): string {
      const lang_name = this.global_languages.find((lang) => lang.isocode === neededLang)?.name_local;
      return lang_name ? lang_name : neededLang;
    },
  },
};
</script>

<template>
  <form class="settings--form" @submit.prevent="handleSubmit">
    <div class="settings--label-form">
      {{ $t('settings.interfaceLanguage') }}
      <Dropdown
        :placeholder="$t('input.interfaceLanguage')"
        :items="$i18n.availableLocales.map((locale) => {
            return {
            value: locale,
            label: getLanguageName(locale),
          };
        })"
        v-model="formInterfaceLang"
        style="padding-inline: 2.8rem"
      />
    </div>
    <div class="buttons">
      <Button
        :text="$t('buttons.reset')"
        size="medium"
        variant="secondary"
        type="button"
        @click="cancelChanges()"
      />
      <Button
        :text="$t('buttons.save')"
        size="medium"
        type="submit"
      />
    </div>
  </form>
</template>

<style lang="scss">
.settings--form {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 6.4rem;

  .buttons {
    display: inline-flex;
    justify-content: right;
    gap: 1.6rem;
  }

  .settings--label-form {
    @include text-2;
    color: $neutrals-600;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
