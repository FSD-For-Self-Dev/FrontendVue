<script lang="ts">
import IconButton from '../UI/button/IconButton.vue';

export default {
  components: {
    IconButton
  },
  props: {
    image: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    deleteAllowed: {
      type: Boolean,
      default: false,
    },
    handleDelete: {
      type: Function,
      required: false,
    },
    deleteId: {
      type: String,
      required: false,
    },
  },
  computed: {
    itemClasses() {
      return {
        active: this.active,
        "delete-allowed": this.deleteAllowed,
      };
    },
  },
};
</script>

<template>
  <div class="cover-choices-list-item" :class="itemClasses">
    <IconButton
      icon="DeleteIcon"
      variant="secondary"
      type="button"
      v-if="deleteAllowed"
      @click.stop="() => (handleDelete ? handleDelete(deleteId) : {})"
      class="cover-image-delete-action"
    />
    <svg-icon
      class="cover-image-chosen-icon"
      name="ChosenFilledIcon"
      color="var:primary-500"
      size="xxl"
    />
    <img class="cover-image" :src="image" />
  </div>
</template>

<style lang="scss">
.cover-choices-list-item {
  position: relative;
  width: 19.6rem;
  height: 15rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: $radius-xl;

  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-image-chosen-icon {
    position: absolute;
    bottom: 0.8rem;
    right: 0.8rem;
    opacity: 0;
  }

  .cover-image-delete-action {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    opacity: 0;
  }

  &:hover {
    outline: 0.5rem solid $primary-300;

    .cover-image-chosen-icon {
      opacity: 90%;
      color: $primary-400;
    }

    .cover-image-delete-action {
      opacity: 100%;
    }
  }

  &.active {
    outline: 0.5rem solid $primary-500;

    .cover-image-chosen-icon {
      opacity: 100%;
      color: $primary-500;
    }
  }
}
</style>
