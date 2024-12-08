<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import Modal from '@/components/UI/modal/Modal.vue';
import { type PropType } from 'vue';

export default {
  data() {
    return {
      showModal: false,
    };
  },
  components: { Button, Modal },
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    buttonSize: {
      type: String as PropType<'normal' | 'medium' | 'small'>,
      default: 'small',
    },
  },
  methods: {
    handleOpen() {
      this.showModal = true;
    },
    handleClose() {
      this.showModal = false;
    },
  },
};
</script>

<template>
  <Button @click.stop="handleOpen" :size="buttonSize" :text="buttonText" icon="AddIcon" />
  <Modal
    v-if="showModal"
    :close-modal="handleClose"
    title-modal="Добавить изучаемые языки"
    icon="ExercisesIcon"
    modalContent="AddLanguagesForm"
    size="md"
  />
</template>
