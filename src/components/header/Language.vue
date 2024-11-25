<script lang="ts">
import RuIcon from '@/components/icons/RuIcon.vue';

export default {
    components: { RuIcon },
};
</script>

<template>
    <button class="language--button">
        <RuIcon size="32"/>
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