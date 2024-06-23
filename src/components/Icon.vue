<script lang="ts">
 import { defineAsyncComponent, defineComponent } from "vue";

 export default defineComponent({
   name: "Icon",
   props: {
     name: {
       type: String,
       required: true,
     },
   },
 });

const icon = defineAsyncComponent(() =>
  import((`/src/assets/icons/name.svg`))
)
</script>

<template>
<component :is="icon"
/>
</template>

<style>
.icon {
  width: 20px;
  height: 20px;
  color: black;
}
</style>


