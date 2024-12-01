<script lang="ts">
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import NewWordButton from './NewWordButton.vue';

export default {
    data() {
        return {
            showModal: false
        }
    },
    components: { NewWordButton },
    computed: {
        ...mapState(useVocabularyStore, ["count", "words"]),
        ...mapState(useLanguagesStore, ["learning_languages"])
    },
    methods: {
        handleToggleModal(state: boolean) {
            this.showModal = state;
        },
        handleWheel(event: WheelEvent) {
            const container = event.currentTarget as HTMLElement;
            event.preventDefault();
            container.scrollLeft += event.deltaY;
        }
    }
}
</script>

<template>
    <button class="vocabulary-main-view" @click="$router.push('vocabulary')">
        <div class="vocabulary-main-view--header">
            <h2 class="vocabulary-main-view--title">
                <svg-icon name="VocabularyIcon" size="lg" style="stroke-width: 0.2;" />
                Словарь
                <span class="counter">{{ count }}</span>
            </h2>

            <svg-icon id="forward-arrow" name="ArrowForwardLineIcon" size="lg" />
        </div>
        <div class="vocabulary-main-view--content">
            <div class="vocabulary-main-view--not-found" v-if="!words.length">
                В словаре пока нет слов или фраз

                <NewWordButton :extra-toggle-modal="handleToggleModal" :extra-show-modal="showModal"
                    button-text="Добавить первые слова" />
            </div>

            <div class="vocabulary-main-view--words" v-else @wheel.prevent="handleWheel">
                <div class="vocabulary-main-view--word" v-for="word in words">
                    <img
                        :src="learning_languages.find(lang => lang.language.name === word.language)?.language.flag_icon" />
                    {{ word.text }}
                </div>
            </div>
        </div>
    </button>
</template>

<style lang="scss">
.vocabulary-main-view {
    width: 100%;
    background-color: $neutrals-100;
    padding: 40px;
    border-radius: 4rem;
    box-shadow: $regular-shadow;
    border: 1px solid transparent;
    cursor: pointer;

    @include hover {
        border: 1px solid $primary-300;

        .vocabulary-main-view--header {
            #forward-arrow {
                color: $primary-300;
            }
        }
    }

    @include active {
        border: 1px solid $primary-500;

        .vocabulary-main-view--header {
            #forward-arrow {
                color: $primary-500;
            }
        }
    }


    .vocabulary-main-view--header {
        padding-bottom: 2rem;
        border-bottom: 0.1rem solid $neutrals-400;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .vocabulary-main-view--title {
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

    .vocabulary-main-view--content {
        padding-top: 2rem;


        .vocabulary-main-view--not-found {
            @include text-2;
            color: $neutrals-700;
            text-align: left;

            display: flex;
            justify-content: space-between;
        }


        .vocabulary-main-view--words {
            display: flex;
            gap: 2rem;
            padding-bottom: 1.6rem;
            overflow-x: auto;
            @include scroll;

            .vocabulary-main-view--word {
                padding: 1.6rem 2rem;
                background-color: $neutrals-100;
                border-radius: 2rem;
                border: .1rem solid $neutrals-300;
                flex-shrink: 0;

                display: flex;
                align-items: center;
                justify-content: center;

                @include heading-4;
                color: $neutrals-900;

                width: 29.5rem;
                height: 34rem;
            }
        }

    }
}
</style>
