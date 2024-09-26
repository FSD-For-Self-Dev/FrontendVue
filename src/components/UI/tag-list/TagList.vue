<template>
  <div class="tag">
    <ul v-if="tags.length" key="list" class="tag__list">
      <li  v-for="(tag, index) in tags" :key="index" class="tag__item">
        <Tag
          :tag="tag">
        </Tag>
      </li>
    </ul>
    <Button v-else variant="primary">
      Добавить тег
    </Button>
  </div>
</template>

<script lang="ts">
import Tag from "@/components/UI/tag/Tag.vue";
import Button from "@/components/UI/button/Button.vue";

export default {
  components: { Tag, Button },
  props: {
    tags: {
      type: Array,
      required: true },
  },
};

</script>


<style scoped lang="scss">
.tag__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>