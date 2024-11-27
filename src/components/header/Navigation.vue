<script lang="ts">
export default {};
</script>

<template>
    <nav class="navigation">
        <ul class="navigation--list">
            <li>
                <a class="navigation--item" @click="$router.push('vocabulary')">
                    <svg-icon name="VocabularyIcon" size="md" />Словарь
                </a>
            </li>
            <li>
                <a class="navigation--item">
                    <svg-icon name="CollectionsIcon" size="md" />Коллекции
                </a>

            </li>
            <li>
                <a class="navigation--item">
                    <svg-icon name="ExercisesIcon" size="md" />Упражнения
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
        gap: 16px;
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
        gap: 0.8rem;
        min-width: 15.2rem;

        &:hover {
            background-color: $primary-300;
            border: 1px solid transparent;
        }
    }
}
</style>