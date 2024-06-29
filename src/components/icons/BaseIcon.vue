<script lang="ts">

export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
}
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       viewBox="0 0 44 44"
       :aria-labelledby="iconName"
  >
    <title
      :id="iconName"
      lang="en"
    >
      {{ iconName }} icon
    </title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>