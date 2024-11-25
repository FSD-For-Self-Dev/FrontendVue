<script lang="ts">
import CollectionsIcon from '@/assets/icons/CollectionsIcon.vue';
import ExercisesIcon from '@/assets/icons/ExercisesIcon.vue';
import VocabularyIcon from '@/assets/icons/VocabularyIcon.vue';


export default {
    name: 'Button',
    components: { VocabularyIcon, CollectionsIcon, ExercisesIcon },
}
</script>

<template>
    <nav class="navigation">
        <ul class="navigation--list">
            <li>
                <a class="navigation--item" @click="$router.push('vocabulary')">
                    <VocabularyIcon size="20" />Мой словарь
                </a>
            </li>
            <li>
                <a class="navigation--item">
                    <CollectionsIcon size="20" />Коллекции
                </a>

            </li>
            <li>
                <a class="navigation--item">
                    <ExercisesIcon size="20" />Упражнения
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
        display: flex;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        border: 1px solid $neutrals-400;
        border-radius: 40px;
        font-size: 16px;
        line-height: 20px;
        background-color: $neutrals-100;
        gap: 0.8rem;

        &:hover {
            background-color: $primary-300;
            border: 1px solid transparent;
        }
    }
}
</style>