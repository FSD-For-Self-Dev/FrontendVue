<script lang="ts">
import Icon from '@/components/UI/icon/Icon.vue';

export default {
    name: 'Button',
    components: { Icon },
}
</script>

<template>
    <nav class="navigation">
        <ul class="navigation--list">
            <li>
                <a class="navigation--item">
                    <Icon name="vocabulary" width="24" height="24" />Мой словарь
                </a>
            </li>
            <li>
                <a class="navigation--item">
                    <Icon name="collections" width="24" height="24" />Коллекции
                </a>

            </li>
            <li>
                <a class="navigation--item">
                    <Icon name="exercises" width="24" height="24" />Упражнения
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

        &:hover {
            background-color: $primary-300;
            border: 1px solid transparent;
        }
    }
}
</style>