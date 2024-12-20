<script lang="ts">
import Input from '../UI/input/Input.vue';

export default {
    components: { Input },
};
</script>

<template>
    <Input style="width: 100%; display: flex" :placeholder="$t('search.search')" icon="SearchIcon" />
</template>

<style lang="scss">
</style>