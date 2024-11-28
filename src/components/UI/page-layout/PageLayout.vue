<script lang="ts">
import { useWindowScroll } from '@vueuse/core';
import Header from '@/components/header/Header.vue';
import Footer from '@/components/footer/Footer.vue';
import IconButton from '@/components/UI/button/IconButton.vue';
import NotificationsList from '@/components/notifications/NotificationsList.vue';

const { x, y } = useWindowScroll({ behavior: 'smooth' });

export default {
    components: { Header, Footer, IconButton, NotificationsList },
    props: {
        landingPage: { type: Boolean, required: false, default: false },
        noFooterPage: { type: Boolean, required: false, default: false },
    },
    data() {
        return {
            y,
        };
    },
    computed: {
        isMainpage() {
            return this.$route.path === '/';
        },
    },
    methods: {
        goBack() {
            if (history.state.back) {
                this.$router.go(-1);
            } else this.$router.push('/');
        },
        scrollToTop() {
            y.value = 0;
        },
    },
};
</script>

<template>
    <div class="layout">
        <Header />
        <main class="main">
            <div :class="{ wrapper: !landingPage }">
                <IconButton v-if="!isMainpage" @click="goBack" class="back-button" icon="ArrowBackwardIcon" size="lg"
                    iconSize="nm" variant="shadowed">
                    <span class="visually-hidden">Назад</span>
                </IconButton>
                <slot></slot>
                <Transition>
                    <IconButton @click="scrollToTop" v-if="!landingPage && y > 50" class="up-button" icon="ArrowUpIcon"
                        size="lg" iconSize="nm" variant="shadowed">
                        <span class="visually-hidden">Наверх</span>
                    </IconButton>
                </Transition>
            </div>
        </main>
        <Footer v-if="!noFooterPage" />
        <NotificationsList />
    </div>
</template>

<style lang="scss" scoped>
.layout {
    min-height: 100vh;
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: $neutrals-200;
}

.main {
    width: 100%;
    background-color: $neutrals-200;
}

.wrapper {
    max-width: 1600px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 4rem 10rem 40rem;
    margin: auto;
}

.back-button {
    position: fixed;
    top: 13.7rem;
    left: 1.6rem;
}

.up-button {
    position: fixed;
    bottom: 4rem;
    right: 1.6rem;
}

.v-enter-active,
.v-leave-active {
    transition:
        opacity 0.2s,
        transform 0.4s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(100px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
