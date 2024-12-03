<script lang="ts">
import { OnClickOutside } from '@vueuse/components';

export default {
  components: {
    OnClickOutside,
  },
  props: {
    handleClose: {
      type: Function,
      required: true,
    },
    handleAddWord: {
      type: Function,
      required: true,
    },
    handleAddWordsMultiple: {
      type: Function,
      required: false,
    },
    handleAddLanguage: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <OnClickOutside @trigger.stop="() => handleClose()" class="click-wrapper2">
    <div class="adding-tools">
      <button @click="() => handleAddWord()" class="adding-tools__button">
        <p>Слово или фраза</p>
      </button>
      <button @click="() => handleAddWordsMultiple ? handleAddWordsMultiple() : {}" class="adding-tools__button">
        <p>Несколько слов или фраз подряд</p>
      </button>
      <button @click="() => handleAddLanguage()" class="adding-tools__button">
        <p>Изучаемый язык</p>
      </button>
    </div>
  </OnClickOutside>
</template>

<style lang="scss">
.adding-tools {
  @include dropdown-list;

  .adding-tools__button {
    @include dropdown-list-item;
  }
}
.click-wrapper2 {
  position: absolute;
  z-index: 1;
  top: 156%;
  left: 72.5%;
}
</style>
