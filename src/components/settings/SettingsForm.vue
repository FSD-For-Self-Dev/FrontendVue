<script lang="ts">
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import Input from '@/components/UI/input/Input.vue';
import Button from '@/components/UI/button/Button.vue';
import type { UserDto } from '@/dto/user.dto';
import { useLanguagesStore } from '@/store/languages';
import { useUserStore } from '@/store/user';
import { useBase64 } from '@vueuse/core';
import { mapActions, mapWritableState } from 'pinia';
import { computed, ref } from 'vue';
import TextButton from '../UI/button/TextButton.vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { Dropdown, Input, Button, TextButton },
  setup() {
    const { global_languages } = useLanguagesStore();
    const { first_name, username, image, native_languages } = useUserStore();
    const dropDownItems = computed(() => {
      return global_languages.map((lang) => {
        return {
          value: lang.name,
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
  methods: {
    ...mapActions(useUserStore, ['patchUser']),
    handleSubmit() {
      const data: UserDto = {
        username: this.formUserName,
        first_name: this.formFirstName,
        native_languages: this.formNativeLang,
        image: this.formImage,
      };
      this.patchUser(data);
    },
    async onFileChanged(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files) {
        const base64 = useBase64(files[0]);
        this.formImage = await base64.promise.value;
      }
    },
    cancelChanges() {
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
        <span class="settings--sub1"
          >Перетащите файл сюда или
          <span class="settings--highlighted">выберите с компьютера</span></span
        >
        <span class="settings--sub2">Картинка (jpg, jpeg, png, gif)</span>
      </div>
    </label>
    <label class="settings--label-form">
      Имя
      <Input v-model="formFirstName" />
    </label>
    <label class="settings--label-form">
      Логин (отображается как @your_login)
      <Input v-model="formUserName" />
    </label>
    <div class="settings--label-form">
      Родной язык
      <Dropdown
        placeholder="Родной язык 1"
        :items="dropDownItems"
        v-model="formNativeLang[0]"
      />
      <Dropdown
        placeholder="Родной язык 2"
        :items="dropDownItems"
        v-model="formNativeLang[1]"
        v-if="formNativeLang[1] || moreNativeLang"
      />
      <TextButton
        text="Добавить еще один родной язык"
        icon="AddIcon"
        type="button"
        @click="moreNativeLang = true"
        v-else
      />
    </div>
    <div class="buttons">
      <Button
        text="Сбросить"
        size="medium"
        variant="secondary"
        type="button"
        @click="cancelChanges()"
      />
      <Button text="Сохранить" size="medium" type="submit" />
    </div>
  </form>
</template>

<style lang="scss">
.settings--form {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .buttons {
    display: inline-flex;
    justify-content: right;
    gap: 1.2rem;
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
    border-radius: 4rem;
    border: 1px dashed $primary-300;

    &.label--drag {
      border: 1px dashed $primary-500;
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
        border-radius: 50%;
        margin-bottom: 2.4rem;
      }

      .settings--not-found-avatar {
        width: 6.4rem;
        height: 6.4rem;
        border: 0.1rem solid $neutrals-400;
        color: $neutrals-500;
        box-sizing: border-box;
        border-radius: 50%;
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
