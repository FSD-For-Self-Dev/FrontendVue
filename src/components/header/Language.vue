<script lang="ts">
import Icon from '@/components/UI/icon/Icon.vue';

export default {
    components: { Icon },
};
</script>

<template>
    <button class="language--button">
        <Icon name="ru" width="32" height="32" />
    </button>
</template>

<style lang="scss">
.language--button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>