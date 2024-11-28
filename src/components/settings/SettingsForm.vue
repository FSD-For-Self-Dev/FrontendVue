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

export default {
  components: { Dropdown, Input, Button },
  computed: {
    ...mapWritableState(useUserStore, ["native_languages", "first_name", "username", "image"])
  },
  setup() {
    const { global_languages } = useLanguagesStore();
    const dropDownItems = computed(() => {
      return global_languages.map((lang) => {
        return {
          value: lang.name,
          label: lang.name_local,
          icon: lang.flag_icon
        }
      })
    })
    const moreNativeLang = ref(false);
    const onDrag = ref(false);

    return {
      onDrag,
      dropDownItems,
      global_languages,
      moreNativeLang
    }
  },
  methods: {
    ...mapActions(useUserStore, ["patchUser"]),
    handleSubmit() {
      const data: UserDto = {
        username: this.username,
        first_name: this.first_name,
        native_languages: this.native_languages,
        image: this.image
      }
      this.patchUser(data);
    },
    async onFileChanged(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files) {
        const base64 = useBase64(files[0]);
        this.image = await base64.promise.value;
      }
    }
  },
}
</script>

<template>
  <form class="settings--form" @submit.prevent="handleSubmit">
    <label class="settings--label-image" :class="{ 'label--drag': onDrag }" v-on:dragenter="onDrag = true"
      v-on:dragleave="onDrag = false" v-on:dragend="onDrag = false" v-on:drop="onDrag = false">
      <input type="file" @change.stop="onFileChanged" accept="image/*" />
      <div class="settings--image-info">
        <img class="settings--avatar" width="140" :src="image" v-if="image" />
        <span class="settings--sub1">Перетащите файл сюда или <span class="settings--highlighted">выберите с
            компьютера</span></span>
        <span class="settings--sub2">Картинка (jpg, jpeg, png, gif)</span>
      </div>
    </label>
    <label class="settings--label-form">
      Имя
      <Input v-model="first_name" />
    </label>
    <label class="settings--label-form">
      Логин (отображается как @your_login)
      <Input v-model="username" />
    </label>
    <div class="settings--label-form">
      Родной язык
      <Dropdown placeholder="Родной язык 1" :items="dropDownItems" v-model="native_languages[0]" />
      <Dropdown placeholder="Родной язык 2" :items="dropDownItems" v-model="native_languages[1]"
        v-if="native_languages[1] || moreNativeLang" />
      <Button
        label="Добавить еще один родной язык"
        icon="AddIcon"
        class="settings--more-native-lang"
        type="button"
        @click="moreNativeLang = true"
        v-else
      />
    </div>
    <Button label="Сохранить" class="settings--submit-button" size="medium" type="submit" />
  </form>
</template>

<style lang="scss">
.settings--form {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .settings--submit-button {
    align-self: end;
  }

  .settings--label-form {
    font-family: 'Inter';
    font-size: 2rem;
    font-weight: 400;
    line-height: 2.4rem;
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
      transition: all .4s ease;

      .settings--avatar {
        position: relative;
        transition: all .5s ease;
        top: 15%;
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

      .settings--sub1 {
        font-family: 'Inter';
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.4rem;
        color: $neutrals-900;
        padding-bottom: 0.8rem;
      }

      .settings--highlighted {
        color: $primary-500;
      }

      .settings--sub2 {
        font-family: 'Inter';
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.8rem;
        color: $neutrals-600;
      }
    }
  }


}

.settings--more-native-lang {
  background-color: transparent;
  border: none;
  padding: 2rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: $primary-500;
  font-family: 'Inter';
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.8rem;

  cursor: pointer;

  &:hover {
    color: $primary-700;
  }

  &:active {
    color: $primary-800;
  }
}
</style>
