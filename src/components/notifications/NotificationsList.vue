<script lang="ts">
import { useAuthStore } from '@/store/auth';
import { mapState } from 'pinia';
import Notification from './Notification.vue';
import { useNotificationsStore } from '@/store/notifications';

export default {
    components: {
        Notification
    },
    computed: {
        ...mapState(useNotificationsStore, ['messages'])
    },
}
</script>

<template>
    <Teleport to="body">
        <div class="notifications" id="notifications">
            <Notification type="error" v-for="message in messages" :key="`message-${message.id}`" :message="message" />
        </div>
    </Teleport>
</template>

<style lang="scss">
.notifications {
    position: fixed;
    top: 12rem;
    right: 2rem;
    z-index: 1000000000;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
</style>