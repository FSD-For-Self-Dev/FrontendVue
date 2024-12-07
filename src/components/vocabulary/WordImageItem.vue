<script lang="ts">
import IconButton from '../UI/button/IconButton.vue';

export default {
  components: { IconButton },
  props: {
    image: {
      type: String,
      required: false,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    handleEdit: {
      type: Function,
      required: false,
    },
    handleDelete: {
      type: Function,
      required: false,
    },
    editIndex: {
      type: Number,
      required: false,
    },
  },
};
</script>

<template>
  <div class="image-item" :class="{ editable: editable }">
    <img :src="image" alt="Image" class="image" />
    <div class="image-item--edit-actions" v-if="editable">
      <IconButton
        icon="DeleteIcon"
        variant="secondary"
        type="button"
        @click="() => (handleDelete ? handleDelete(editIndex) : {})"
      />
      <IconButton
        icon="EditIcon"
        variant="secondary"
        type="button"
        @click="() => (handleEdit ? handleEdit(image, editIndex) : {})"
      />
    </div>
  </div>
</template>

<style lang="scss">
.image-item {
  position: relative;
  width: 26rem;
  height: 26rem;
  border-radius: $radius-xl;
  background-color: $neutrals-200;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: $radius-xl;
    box-shadow: $regular-shadow;
  }

  &--edit-actions {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    opacity: 0;
  }
}

.editable:hover {
  .image {
    outline: $neutrals-500 solid 0.1rem;
  }
  .image-item--edit-actions {
    opacity: 100%;
  }
}
</style>
