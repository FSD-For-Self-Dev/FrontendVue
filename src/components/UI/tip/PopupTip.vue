<script lang="ts">
import { mapState } from 'pinia';

export default {
  props: {
    text: {
      type: String,
      required: false,
    },
    iconUrl: {
      type: String,
      required: false,
    },
    iconName: {
      type: String,
      required: false,
    },
    showTip: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div v-if="showTip" :class="$style['popup-tip--wrap']" v-bind="{...$attrs}">
    <img
      :src="iconUrl"
      alt="Icon"
      :class="$style.icon"
      v-if="iconUrl"
    />
    <svg-icon
      :name="iconName"
      size="nm"
      v-if="iconName"
    />
    <p
      :class="$style['popup-tip--text']"
      v-if="text"
    >
      {{ text }}
    </p>
    <slot></slot>
  </div>
</template>

<style lang="scss" module>
.popup-tip--wrap {
  position: absolute;
  margin-bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.6rem 2rem;
  box-shadow: $strong-shadow;
  width: max-content;
  border-radius: $radius-md;
  background-color: $neutrals-100;
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
  max-width: 70rem;
  --text-line-clamp: 4;
}
.popup-tip--text {
  @include text-2;
  width: 100%;
  word-wrap: normal;
  word-break: keep-all;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: var(--text-line-clamp);
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon {
  width: 2rem;
  height: 2rem;
}
</style>