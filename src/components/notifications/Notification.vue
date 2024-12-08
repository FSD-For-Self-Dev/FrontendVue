<script lang="ts">
import { mapActions } from 'pinia';
import { useNotificationsStore } from '@/store/notifications';

export default {
    props: {
        message: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            timerTik: 0,
            interval: null as number | null
        }
    },
    mounted() {
        this.interval = window.setInterval(() => {
            this.timerTik++;
            if (this.timerTik > 5) {
                this.deleteMessageById(this.message.id)
            }
        }, 1000)
    },
    unmounted() {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.timerTik = 0;
    },
    methods: {
        ...mapActions(useNotificationsStore, ['deleteMessageById']),
    },
}
</script>

<template>
    <div class="notifications--item">
        <div class="notifications--item__left">
            <svg-icon name="ErrorIcon" size="md" color="var:danger-500" v-if="message.type === 'error'" />
            <svg-icon name="InfoIcon" size="md" color="var:success-500" v-else-if="message.type === 'info'" />
            <span class="notifications--text">{{ message.text }}</span>
        </div>
        <div>
            <svg-icon
            @click.stop="() => deleteMessageById(message.id)"
            class="notification__close"
            name="CloseIcon"
            size="md"
            hoverColor="var:primary-500"
            />
        </div>
    </div>
</template>


<style lang="scss">
.notifications--item {
    padding: 2.4rem 2rem;
    box-shadow: $regular-shadow;
    border-radius: $radius-xl;
    background-color: $neutrals-100;
    display: flex;
    align-items: center;
    min-width: 100%;
    justify-content: space-between;
}

.notifications--text {
    @include text-2;
    color: $neutrals-900;
    max-width: 35rem;
    margin-right: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.notification__close {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.notifications--item__left {
    display: flex;
    align-items: center;
    gap: 1.2rem;
}
</style>