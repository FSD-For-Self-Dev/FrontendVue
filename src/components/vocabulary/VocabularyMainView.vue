<script lang="ts">
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import LineArrowForwardIcon from '@/assets/icons/arrows/LineArrowForwardIcon.vue';
import VocabularyIcon from '@/assets/icons/vocabulary/VocabularyIcon.vue';
import VocabularyButtonForModal from './VocabularyButtonForModal.vue';

export default {
    data() {
        return {
            showModal: false
        }
    },
    components: { VocabularyIcon, LineArrowForwardIcon, VocabularyButtonForModal },
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
    <button class="vocabulary-main-view"
        @click="count > 0 ? $router.push('vocabulary') : handleToggleModal(!showModal)">
        <div class="vocabulary-main-view--header">
            <h2 class="vocabulary-main-view--title">
                <VocabularyIcon size="32" />Словарь <span style="color: #737782">{{ count }}</span>
            </h2>

            <div id="forward-arrow">
                <LineArrowForwardIcon size="32" />
            </div>
        </div>
        <div class="vocabulary-main-view--content">
            <div class="vocabulary-main-view--not-found" v-if="!words.length">
                В словаре пока нет слов или фраз

                <VocabularyButtonForModal :extra-toggle-modal="handleToggleModal" :extra-show-modal="showModal"
                    text-button="Добавить первые слова" />
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
            font-family: 'Inter';
            font-size: 2rem;
            line-height: 2.4rem;
            font-weight: 500;
            display: flex;
            gap: 0.8rem;
            align-items: center;
        }
    }

    .vocabulary-main-view--content {
        padding-top: 2rem;


        .vocabulary-main-view--not-found {
            font-style: 'Inter';
            font-size: 1.6rem;
            line-height: 2rem;
            font-weight: 400;
            text-align: left;

            display: flex;
            justify-content: space-between;
        }


        .vocabulary-main-view--words {
            display: flex;
            gap: 1.6rem;
            padding-bottom: 1.6rem;
            overflow-x: auto;

            &::-webkit-scrollbar {
                height: .4rem;
                background-color: transparent;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: $radius-lg;
                background-color: $neutrals-400;
            }

            .vocabulary-main-view--word {
                padding: 1.6rem 2rem;
                background-color: $neutrals-100;
                border-radius: 2rem;
                border: .1rem solid $neutrals-300;
                flex-shrink: 0;

                display: flex;
                align-items: center;
                justify-content: center;

                font-family: Inter;
                font-size: 2.4rem;
                font-weight: 600;
                line-height: 2.8rem;


                width: 29.5rem;
                height: 34rem;
            }
        }

    }
}
</style>
