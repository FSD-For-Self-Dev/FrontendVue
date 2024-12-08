<script lang="ts">
export default {};
</script>

<template>
    <nav class="navigation">
        <ul class="navigation--list">
            <li>
                <a class="navigation--item" @click="$router.push('vocabulary')">
                    <svg-icon name="VocabularyIcon" size="md" style="stroke-width: 0.2;" />Словарь
                </a>
            </li>
            <li>
                <a class="navigation--item" @click="$router.push('collections')">
                    <svg-icon name="CollectionsIcon" size="md" style="stroke-width: 0.2;" />Коллекции
                </a>

            </li>
            <li>
                <a class="navigation--item" @click="$router.push('exercises')">
                    <svg-icon name="ExercisesIcon" size="md" style="stroke-width: 0.2;" />Упражнения
                </a>
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
        padding: 12px 16px;
        cursor: pointer;
        border: 1px solid $neutrals-400;
        border-radius: 40px;
        line-height: 20px;
        background-color: $neutrals-100;
        gap: 0.6rem;
        min-width: 15.2rem;

        &:hover {
            background-color: $primary-300;
            border: 1px solid transparent;
        }
    }
}
</style>