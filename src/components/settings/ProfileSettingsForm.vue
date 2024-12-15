<script lang="ts">
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import Input from '@/components/UI/input/Input.vue';
import Button from '@/components/UI/button/Button.vue';
import type { UserDto } from '@/dto/user.dto';
import { useLanguagesStore } from '@/store/languages';
import { useUserStore } from '@/store/user';
import { useBase64 } from '@vueuse/core';
import { mapActions } from 'pinia';
import { computed, ref } from 'vue';
import TextButton from '../UI/button/TextButton.vue';
import { useWindowScroll } from '@vueuse/core';
import { useNotificationsStore } from '@/store/notifications';
import { isAxiosError } from 'axios';
import { readUrlFile } from '@/utils/readUrlFile';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { Dropdown, Input, Button, TextButton },
  data() {
    return {
      submitProcess: false,
    }
  },
  setup() {
    const { global_languages } = useLanguagesStore();
    const { first_name, username, image, native_languages } = useUserStore();
    const dropDownItems = computed(() => {
      return global_languages.map((lang) => {
        return {
          value: lang.isocode,
          label: lang.name_local,
          icon: lang.flag_icon,
        };
      });
    });

    const moreNativeLang = ref(false);
    const onDrag = ref(false);
    const formImage = ref(image);
    const formFirstName = ref(first_name);
    const formUserName = ref(username);
    const formNativeLang = ref(native_languages.length > 0 ? native_languages.slice() : ['']);

    return {
      onDrag,
      dropDownItems,
      global_languages,
      moreNativeLang,
      formImage,
      formFirstName,
      formUserName,
      formNativeLang,
      first_name,
      username,
      image,
      native_languages,
    };
  },
  async mounted() {
    const base64 = useBase64(await readUrlFile(this.formImage));
    this.formImage = await base64.promise.value;
  },
  methods: {
    ...mapActions(useUserStore, ['patchUser']),
    ...mapActions(useLanguagesStore, ["getAllLanguages"]),
    ...mapActions(useNotificationsStore, ["addNewMessage"]),
    async handleSubmit() {
      this.submitProcess = true;
      const data: UserDto = {
        username: this.formUserName,
        first_name: this.formFirstName,
        native_languages: this.formNativeLang,
        image: this.formImage,
      };
      const res = await this.patchUser(data, this.$i18n.locale);
      if (isAxiosError(res)) {
        console.log(res.response?.data);
      } else {
        this.getAllLanguages(this.$i18n.locale);
        this.addNewMessage({
          type: 'info',
          text: this.$t('infoMessage.changesSaved'),
        });
      };
      this.submitProcess = false;
    },
    async onFileChanged(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files) {
        const base64 = useBase64(files[0]);
        this.formImage = await base64.promise.value;
      }
    },
    async cancelChanges() {
      y.value = 0;
      this.formImage = this.image;
      this.formFirstName = this.first_name;
      this.formUserName = this.username;
      this.formNativeLang = this.native_languages.slice();
    },
  },
};
</script>

<template>
  <form class="settings--form" @submit.prevent="handleSubmit">
    <label
      class="settings--label-image"
      :class="{ 'label--drag': onDrag }"
      v-on:dragenter="onDrag = true"
      v-on:dragleave="onDrag = false"
      v-on:dragend="onDrag = false"
      v-on:drop="onDrag = false"
    >
      <input
        type="file"
        @change.stop="onFileChanged"
        accept="image/*"
        style="cursor: pointer"
      />
      <div class="settings--image-info">
        <div v-if="!formImage" class="settings--not-found-avatar">
          <svg-icon name="ProfileIcon" size="lg" color="var:neutral-500" />
        </div>
        <img v-else class="settings--avatar" width="140" :src="formImage" />
        <span class="settings--sub1">
          {{ $t('tip.fileUpload1') }}
          <span class="settings--highlighted">
            {{ $t('tip.fileUpload2') }}
          </span>
        </span>
        <span class="settings--sub2">{{ $t('tip.fileUpload3') }}</span>
      </div>
    </label>
    <label class="settings--label-form">
      {{ $t('user.firstName') }}
      <Input v-model="formFirstName" />
    </label>
    <label class="settings--label-form">
      {{ $t('user.username') }}
      <Input v-model="formUserName" />
    </label>
    <div class="settings--label-form">
      {{ $t('user.nativeLanguage') }}
      <Dropdown
        :placeholder="$t('user.nativeLanguage1')"
        :items="dropDownItems"
        v-model="formNativeLang[0]"
        style="padding-inline: 2.8rem"
      />
      <Dropdown
        :placeholder="$t('user.nativeLanguage2')"
        :items="dropDownItems"
        v-model="formNativeLang[1]"
        v-if="formNativeLang[1] || moreNativeLang"
        style="padding-inline: 2.8rem"
      />
      <TextButton
        :text="$t('user.addNativeLanguage')"
        icon="AddIcon"
        type="button"
        @click="moreNativeLang = true"
        v-else
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
      <Button v-if="!submitProcess" :text="$t('buttons.save')" size="medium" type="submit" />
      <Button v-else :text="$t('tip.saveProcceed')" size="medium" type="submit" disabled />
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

  .settings--label-image {
    position: relative;
    width: 100%;
    background-color: $neutrals-100;
    padding: 4rem 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: $radius-2xl;
    border: 0.1rem dashed $primary-300;

    &.label--drag {
      border: 0.1rem dashed $primary-500;
      background-color: $primary-200;
      transition: all 0.4s ease;

      .settings--avatar {
        position: relative;
        transition: all 0.5s ease;
        top: 15%;
      }

      .settings--not-found-avatar {
        position: relative;
        transition: opacity 0.5s ease;
        top: 24%;
        background-color: $neutrals-100;
      }

      .settings--sub1,
      .settings--sub2 {
        opacity: 0;
        transition: opacity 0.5s ease;
      }
    }

    & input {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 20;
    }

    .settings--image-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 34rem;
      text-align: center;
      position: relative;

      .settings--avatar {
        width: 14rem;
        height: 14rem;
        object-fit: cover;
        border-radius: $radius-full;
        margin-bottom: 2.4rem;
      }

      .settings--not-found-avatar {
        width: 6.4rem;
        height: 6.4rem;
        border: 0.1rem solid $neutrals-400;
        color: $neutrals-500;
        box-sizing: border-box;
        border-radius: $radius-full;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2.4rem;
      }

      .settings--sub1 {
        @include subheading-3;
        color: $neutrals-900;
        padding-bottom: 0.8rem;
      }

      .settings--highlighted {
        color: $primary-500;
      }

      .settings--sub2 {
        @include text-3;
        color: $neutrals-600;
      }
    }
  }
}
</style>
