<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import { useWindowScroll } from '@vueuse/core';
import { type PropType, type Component, ref } from 'vue';
import { defineAsyncComponent } from 'vue';

const { y } = useWindowScroll({ behavior: 'smooth' });

export default {
  components: { OnClickOutside },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    titleModal: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    size: {
      type: String as PropType<'md' | 'lg'>,
      default: 'md',
    },
    modalContent: {
      type: String,
      required: true,
    },
    objectLookup: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const title = ref(props.titleModal);

    y.value = 0;

    return {
      title,
    };
  },
  methods: {
    updateTitle(title: string) {
      this.title = title;
    },
  },
  computed: {
    modalSize() {
      return this.size === 'lg' ? 'modal--lg' : 'modal--md';
    },
    dynamicComponent() {
      const modalContent = this.modalContent;
      return defineAsyncComponent(() => import(`./modal-content/${modalContent}.vue`));
    },
  },
};
</script>

<template>
  <teleport to="body">
    <div class="overlay"></div>

    <OnClickOutside @trigger="() => closeModal()">
      <div class="modal" :class="modalSize">
        <div class="modal--header">
          <h2 class="modal--title">
            <svg-icon
              v-if="icon"
              size="lg"
              :name="icon"
              style="stroke-width: 0.03rem"
            />{{ title }}
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
            :closeForm="closeModal"
            :updateTitle="updateTitle"
            :objectLookup="objectLookup"
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
