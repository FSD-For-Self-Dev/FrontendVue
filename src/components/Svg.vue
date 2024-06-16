<script setup lang="ts">

 import { defineAsyncComponent, defineProps } from "vue";

 const props = defineProps({
  name: {
    type: String,
    required: true
  }
  })

const icon = defineAsyncComponent(() =>
  import((`/src/styles/icons/pen.svg`)) // import((`/src/styles/icons/${props.name}.svg`))
)

</script>

<template>

<component :is="icon"
/>
</template>

