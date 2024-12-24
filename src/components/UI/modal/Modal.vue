<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import { useWindowScroll } from '@vueuse/core';
import { type PropType, type Component, ref } from 'vue';
import { defineAsyncComponent } from 'vue';
import { useModalStore, type ModalStore } from '../../../store/modal';
import { mapActions, mapState, mapWritableState } from 'pinia';

const { y } = useWindowScroll({ behavior: 'smooth' });

export default {
  inheritAttrs: false,
  components: { OnClickOutside },
  setup() {
    y.value = 0;
  },
  computed: {
    ...mapState(useModalStore, [
      'modalContent',
      'modalIcon',
      'modalSize',
    ]),
    ...mapWritableState(useModalStore, ['modalTitle']),
    modalClass() {
      return {
        'modal--xl': this.modalSize === 'xl',
        'modal--lg': this.modalSize === 'lg',
        'modal--md': this.modalSize === 'md',
      };
    },
    dynamicComponent() {
      const modalContent = this.modalContent;
      return defineAsyncComponent(() => import(`./modal-content/${modalContent}.vue`));
    },
  },
  methods: {
    ...mapActions(useModalStore, ['closeModal']),
    updateTitle(title: string) {
      this.modalTitle = title;
    },
  },
};
</script>

<template>
  <teleport to="body">
    <div class="overlay"></div>

    <OnClickOutside @trigger="() => closeModal()">
      <div class="modal" :class="modalClass">
        <div class="modal--header">
          <h2 class="modal--title">
            <svg-icon
              v-if="modalIcon"
              size="lg"
              :name="modalIcon"
              style="stroke-width: 0.03rem"
            />
            {{ modalTitle }}
          </h2>

          <svg-icon
            class="modal--close"
            @click="() => closeModal()"
            size="lg"
            name="CloseIcon"
            hoverColor="var:primary-500"
          />
        </div>

        <div class="modal--form">
          <component
            :is="dynamicComponent"
            :updateTitle="updateTitle"
            v-bind="{ ...$attrs, onInput: undefined }"
          />
        </div>
      </div>
    </OnClickOutside>
  </teleport>
</template>

<style lang="scss">
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: $neutrals-600;
  opacity: 30%;
  top: 0;
  left: 0;
  z-index: 20000;
}

.modal {
  position: absolute;
  top: 6.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 25000;
  border-radius: $radius-2xl;
  background-color: #fff;
  padding: 4rem 6rem;
  box-shadow: $regular-shadow;

  &.modal--md {
    width: 70rem;
  }

  &.modal--lg {
    width: 96rem;
  }

  &.modal--xl {
    width: 108rem;
  }

  .modal--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4rem;
    gap: 1.2rem;

    .modal--title {
      @include subheading-3;
      color: $neutrals-900;
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }

    .modal--close {
      cursor: pointer;
    }
  }
}
</style>
