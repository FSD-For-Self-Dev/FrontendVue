<script lang="ts">
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import AddLanguagesButton from './AddLanguagesButton.vue';
import LanguageCard from './LanguageCard.vue';


export default {
    data() {
        return {
            showModal: false
        };
    },
    components: { AddLanguagesButton, LanguageCard },
    computed: {
        ...mapState(useLanguagesStore, ['learning_languages', 'count'])
    },
    methods: {
        handleToggleModal(state: boolean) {
            this.showModal = state;
        }
    },
}
</script>

<template>
    <div class="learning-languages">
        <div class="learning-languages--header">
            <h2 class="learning-languages--header--title">
                <svg-icon name="LanguageIcon" size="lg" style="stroke-width: 0.2;" />
                Изучаемые языки
                <span class="counter">{{ count }}</span>
            </h2>
            <AddLanguagesButton button-size="medium" button-text="Добавить язык" />
        </div>
        <div class="learning-languages--content">
            <LanguageCard :language="language" v-for="language in learning_languages" size="large" />
        </div>
    </div>
</template>

<style lang="scss">
.learning-languages {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    &--header {
        display: flex;
        justify-content: space-between;
        width: 100%;

        &--title {
            @include subheading-3;
            color: $neutrals-900;
            display: flex;
            gap: 0.8rem;
            align-items: center;

            .counter {
                color: $neutrals-600
            }
        }
    }

    &--content {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
    }
}
</style>