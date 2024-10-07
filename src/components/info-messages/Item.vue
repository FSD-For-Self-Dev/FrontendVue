<script lang="ts">
import { useAuthStore } from '@/store/auth';
import { mapActions } from 'pinia';
import Icon from '@/components/UI/icon/Icon.vue';
import { useInfoMessagesStore } from '@/store/info-message';

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
            interval: 0
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.timerTik++;
            if (this.timerTik > 10) {
                this.deleteMessageById(this.message.id)
            }
        }, 1000)
    },
    unmounted() {
        clearInterval(this.interval);
        this.timerTik = 0;
    },
    methods: {
        ...mapActions(useInfoMessagesStore, ['deleteMessageById']),
    },
    components: {
        Icon
    }
}
</script>

<template>
    <div class="info-messages--item">
        <div class="info-messages--item__left">
            <Icon :name="message.type" width="24" />
            {{ message.text }}
        </div>
        <button @click.stop="() => deleteMessageById(message.id)" class="info-message__close">
            <Icon name="close" width="18" />
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

.info-message__close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    width: 1.8rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
}

.info-messages--item__left {
    display: flex;
    align-self: center;
    gap: 1.4rem
}
</style>