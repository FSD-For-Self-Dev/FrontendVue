<script lang="ts">
import Dropdown from '../UI/dropdown/Dropdown.vue';

export default {
  components: { Dropdown },
  emits: ["localeUpdated"],
  methods: {
    updateLocale() {
      this.$emit("localeUpdated");
    },
  },
};
</script>

<template>
  <Dropdown
    v-model="$i18n.locale"
    :items="
      $i18n.availableLocales.map((locale) => {
        return {
          value: locale,
          label: locale,
        };
      })
    "
    @update:modelValue="updateLocale"
    :noChevron="true"
    style="padding-inline: 0; border: 0; min-height: 0; background-color: transparent;"
    class="language-changer"
  />
</template>

<style lang="scss">
.language-changer {
  span {
    @include tag-xxlarge;
  }

  .dropdown-item {
    min-width: 4rem;

    span {
      @include tag-xlarge;
    }
  }

  .dropdown-menu {
    width: max-content;
    top: 140%;
    left: -50%;
  }

  .dropdown-content {
    width: max-content;
  }

  &:hover {
    .selected-span {
      color: $primary-500;
    }
  }
}
</style>
