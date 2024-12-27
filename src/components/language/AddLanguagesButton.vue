<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import { useModalStore } from '@/store/modal';
import type { ButtonProps } from '@/types/components/button';
import { mapActions } from 'pinia';
import { type PropType } from 'vue';

export default {
  components: { Button },
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    buttonSize: {
      type: String as PropType<ButtonProps['size']>,
      default: 'small',
    },
  },
  methods: {
    ...mapActions(useModalStore, ['openModal']),
  },
};
</script>

<template>
  <Button
    @click.stop="
      () =>
        openModal(
          'AddLanguagesForm',
          $t('title.newLearningLanguages'),
          'ExercisesIcon',
          'md',
        )
    "
    :size="buttonSize"
    :text="buttonText"
    icon="AddIcon"
    v-bind="{ ...$attrs }"
  />
</template>
