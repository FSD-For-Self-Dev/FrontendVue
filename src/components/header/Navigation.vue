<script lang="ts">
export default {};
</script>

<template>
  <nav class="navigation">
    <ul class="navigation--list">
      <li>
        <router-link :to="{ name: 'vocabulary' }" class="navigation--item" >
          <svg-icon name="VocabularyIcon" size="md" style="stroke-width: 0.2" />
          {{ $t('navigation.vocabulary') }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'collections' }" class="navigation--item" >
          <svg-icon name="CollectionsIcon" size="md" style="stroke-width: 0.2" />
          {{ $t('navigation.collections') }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'exercises' }" class="navigation--item" >
          <svg-icon name="ExercisesIcon" size="md" style="stroke-width: 0.2" />
          {{ $t('navigation.exercises') }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.navigation {
  position: relative;
  z-index: 100;

  &--list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1.6rem;
  }

  &--item {
    @include text-2;
    display: flex;
    align-items: center;
    padding: 1.2rem 1.6rem;
    cursor: pointer;
    border: 0.1rem solid $neutrals-400;
    border-radius: $radius-2xl;
    background-color: $neutrals-100;
    gap: 0.6rem;
    min-width: 15.2rem;

    &:hover {
      background-color: $primary-300;
      border: 0.1rem solid transparent;
    }
  }
}
</style>
