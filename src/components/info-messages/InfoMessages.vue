<script lang="ts">
import { useAuthStore } from '@/store/auth';
import { mapState } from 'pinia';
import Item from './Item.vue';

export default {
    components: {
        Item
    },
    computed: {
        ...mapState(useAuthStore, ['errors'])
    },
}
</script>

<template>
    <Teleport to="body">
        <div class="info-messages" id="info-messages">
            <Item type="error" v-for="(error, index) in errors.non_field_errors.slice(0, 3)" :key="`message-${index}`" :message="error"
                :index="index" />
        </div>
    </Teleport>
</template>

<style lang="scss">
.info-messages {
    position: fixed;
    top: 12rem;
    right: 2rem;
    width: 46.4rem;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
</style>