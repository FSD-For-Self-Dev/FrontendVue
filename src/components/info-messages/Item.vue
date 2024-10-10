<script lang="ts">
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
            interval: null as number | null
        }
    },
    mounted() {
        this.interval = window.setInterval(() => {
            this.timerTik++;
            if (this.timerTik > 10) {
                this.deleteMessageById(this.message.id)
            }
        }, 10000)
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
        Icon
    }
}
</script>

<template>
    <div class="info-messages--item">
        <div class="info-messages--item__left">
            <Icon :name="message.type" :width="21" :height="21"
                :color="message.type === 'error' ? '#FF384F' : '#41DB4E'" />
                <span class="info-messages--text">{{ message.text }}</span>

        </div>
        <button @click.stop="() => deleteMessageById(message.id)" class="info-message__close">
            <Icon name="close" width="18" height="18" />
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
    width: 3.2rem;
    height: 3.2rem;
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