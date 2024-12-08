<script lang="ts">
import { ref } from 'vue';

export default {
  components: {},
  props: {
    image: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      newImage: '',
      newImageUrl: '',
    };
  },
  setup(props) {
    const onDrag = ref(false);
    return {
      onDrag,
    };
  },
  computed: {
    emptyImage(): string {
      return new URL(`/src/assets/images/emptyImage.svg`, import.meta.url).href;
    },
  },
};
</script>

<template>
  <label
    class="image-form"
    :class="{ 'label--drag': onDrag }"
    v-on:dragenter="onDrag = true"
    v-on:dragleave="onDrag = false"
    v-on:dragend="onDrag = false"
    v-on:drop="onDrag = false"
  >
    <input type="file" accept="image/*" class="image-form--input" />
    <div class="image-form--tip">
      <div v-if="image" class="image-form--upload">
        <img class="img" :src="image" alt="image" />
      </div>
      <div v-else-if="!newImage" class="image-form--empty">
        <img :src="emptyImage" alt="empty" class="img" width="172" height="128" />
      </div>
      <span class="image-form--sub1"
        >Перетащите файл сюда или
        <span class="image-form--highlighted">выберите с компьютера</span></span
      >
      <span class="image-form--sub2">Картинка (jpg, jpeg, png, gif)</span>
    </div>
  </label>
</template>

<style lang="scss">
.image-form {
  position: relative;
  width: 100%;
  background-color: $neutrals-100;
  padding: 4rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: $radius-2xl;
  border: 0.1rem dashed $primary-300;

  .image-form--tip {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    height: max-content;
    align-items: center;
    justify-content: center;
  }

  .image-form--empty {
    position: relative;
    transition: opacity 0.5s ease;
    background-color: $neutrals-100;
  }

  .image-form--upload {
    position: relative;
    transition: opacity 0.5s ease;
    width: 16rem;
    height: 16rem;
    background-color: $neutrals-100;
    border-radius: $radius-full;
    overflow: hidden;
    inset: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .image-form--input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 20;
    cursor: pointer;
  }

  .image-form--sub1 {
    @include subheading-3;
    color: $neutrals-900;
  }

  .image-form--highlighted {
    color: $primary-500;
  }

  .image-form--sub2 {
    @include text-3;
    color: $neutrals-600;
  }
}

.label--drag {
  border: 0.1rem dashed $primary-500;
  background-color: $primary-200;
  transition: all 0.4s ease;

  .image-form--tip {
    position: relative;
    transition: all 0.5s ease;
    top: 15%;
  }

  .image-form--empty {
    position: relative;
    transition: opacity 0.5s ease;
    top: 24%;
    background-color: $primary-200;
  }

  .image-form--sub1,
  .image-form--sub2 {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
}
</style>
