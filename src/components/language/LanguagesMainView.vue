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
    <button class="languages-main-view" @click="$router.push('languages')">
        <div class="languages-main-view--header">
            <h2 class="languages-main-view--title">
                <svg-icon name="LanguageIcon" size="lg" style="stroke-width: 0.2;" />
                Изучаемые языки
                <span class="counter">{{ count }}</span>
            </h2>
            <svg-icon id="forward-arrow" name="ArrowForwardLineIcon" size="lg" />
        </div>

        <div class="languages-main-view--content">
            <div class="languages-main-view--not-found-learning-languages" v-if="learning_languages.length === 0">
                Нет изучаемых языков
                <AddLanguagesButton :extra-toggle-modal="handleToggleModal" :extra-show-modal="showModal"
                    button-text="Добавить первый язык" />
            </div>
            <div class="languages-main-view--learning-languages" v-else>
                <div class="languages-main-view--learning-languages-list">
                    <LanguageCard :language="language" v-for="language in learning_languages" />
                </div>
            </div>
        </div>
    </button>
</template>

<style lang="scss">
.languages-main-view {
    background-color: $neutrals-100;
    padding: 40px;
    border-radius: 4rem;
    box-shadow: $regular-shadow;
    border: 1px solid transparent;
    cursor: pointer;
    width: 100%;
    max-height: max-content;

    display: flex;
    flex-direction: column;

    @include hover {
        border: 1px solid $primary-300;

        .languages-main-view--header {
            #forward-arrow {
                color: $primary-300;
            }
        }
    }

    @include active {
        border: 1px solid $primary-500;

        .languages-main-view--header {
            #forward-arrow {
                color: $primary-500;
            }
        }
    }


    .languages-main-view--header {
        padding-bottom: 2rem;
        border-bottom: 0.1rem solid $neutrals-400;
        display: flex;
        justify-content: space-between;

        width: 100%;


        .languages-main-view--title {
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

    .languages-main-view--content {
        padding-top: 2rem;
        width: 100%;

        .languages-main-view--not-found-learning-languages {
            @include text-2;
            color: $neutrals-700;
            text-align: left;

            display: flex;
            justify-content: space-between;
        }

        .languages-main-view--learning-languages-list {
            display: flex;
            gap: 2rem;
            padding-bottom: 1.6rem;
            overflow-x: auto;
            @include scroll;
        }
    }
}
</style>