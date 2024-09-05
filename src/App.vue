<template>
    <RouterView v-if="!isLoading" />
    <RouterView name="helper" v-if="!isLoading" />

    <div v-else class="preloader">
        <Preloader />
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { useUserStore } from './store/user';
import Preloader from '@/components/UI/preloader/Preloader.vue';
import { useLanguagesStore } from './store/languages';
import { useVocabularyStore } from './store/vocabulary';
export default {
    components: { Preloader },
    data() {
        return {
            isLoading: true
        };
    },
    methods: {
        ...mapActions(useUserStore, ["getUser"]),
        ...mapActions(useLanguagesStore, ["getAvailableLanguages", "getLearningLanguages"]),
        ...mapActions(useVocabularyStore, ["getVocabulary"])
    },
    mounted() {
        Promise.all([
            this.getUser(),
            this.getAvailableLanguages(),
            this.getLearningLanguages(),
            this.getVocabulary()
        ]).finally(() => {
            this.isLoading = false;
        });
    },
};
</script>

<style scoped lang="scss">
.preloader {
    width: 100svw;
    height: 100svh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
