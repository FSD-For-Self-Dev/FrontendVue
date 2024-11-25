<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import { type PropType, type Component, ref } from 'vue';
import CloseIcon from '@/assets/icons/CloseIcon.vue';

export default {
  components: { OnClickOutside, CloseIcon },
  props: {
    closeModal: {
      type: Function,
      required: true
    },
    titleModal: {
      type: String,
    },
    form: {
      type: Object as PropType<Component>,
    },
    iconModal: {
      type: Object as PropType<Component>,
    },
    size: {
      type: String as PropType<'md' | 'lg'>,
      default: 'md'
    }
  },
  setup(props) {
    const title = ref(props.titleModal);
    return {
      title
    };
  },
  methods: {
    updateTitle(title: string) {
      this.title = title;
    }
  },
  computed: {
    modalSize() {
      return this.size === 'lg' ? 'modal--lg' : 'modal--md';
    }
  }
}
</script>

<template>
  <teleport to="body">
    <div class="overlay"></div>

    <OnClickOutside @trigger="() => closeModal()">
      <div class="modal" :class="modalSize">

        <div class="modal--header">
          <h2 class="modal--title">
            <component size="32" :is="iconModal" v-if="iconModal" /> {{ title }}
          </h2>

          <button class="modal--close" @click="() => closeModal()">
            <CloseIcon size="44" />
          </button>
        </div>

        <div class="modal--form">
          <component :is="form" :closeForm="closeModal" :updateTitle="updateTitle" />
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
  background-color: $neutrals-200;
  opacity: 60%;
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
    min-width: 68.5rem;
  }

  &.modal--lg {
    min-width: 96rem;
  }

  .modal--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4rem;

    .modal--title {
      font-family: 'Inter';
      font-size: 2.4rem;
      font-weight: 500;
      line-height: 2.8rem;

      display: flex;
      align-items: center;
      gap: 0.8rem;


    }

    .modal--close {
      background-color: transparent;
      border: none;
      padding: 0;
      cursor: pointer;

      &:hover {
        color: $primary-300;
      }
    }
  }
}
</style>
