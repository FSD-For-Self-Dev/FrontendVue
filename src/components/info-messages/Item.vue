<script lang="ts">
import { mapActions } from 'pinia';
import CloseIcon from '@/assets/icons/CloseIcon.vue';
import { useInfoMessagesStore } from '@/store/info-message';
import ErrorIcon from '@/assets/icons/ErrorIcon.vue';
import InfoIcon from '@/assets/icons/InfoIcon.vue';

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
        ...mapActions(useInfoMessagesStore, ['deleteMessageById']),
    },
    components: {
        ErrorIcon,
        InfoIcon,
        CloseIcon,
    }
}
</script>

<template>
    <div class="info-messages--item">
        <div class="info-messages--item__left">
            <ErrorIcon size="24" custom-color="#CA2744" v-if="message.type === 'error'" />
            <InfoIcon size="24" custom-color="#41DB4E" v-else-if="message.type === 'info'" />
            <span class="info-messages--text">{{ message.text }}</span>
        </div>
        <button @click.stop="() => deleteMessageById(message.id)" class="info-message__close">
            <CloseIcon custom-color="#272932" size="20" />
        </button>
    </div>
</template>


<style lang="scss">
.info-messages--item {
    padding: 2.4rem 2rem;
    box-shadow: $regular-shadow;
    border-radius: 2rem;
    background-color: $neutrals-100;
    display: flex;
    align-items: center;
    min-width: 100%;
    justify-content: space-between;
}

.info-messages--text {
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 400;
    max-width: 35rem;
}

.info-message__close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.info-messages--item__left {
    display: flex;
    align-items: center;
    gap: 1.2rem;
}
</style>