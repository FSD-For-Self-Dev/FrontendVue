<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import LineArrowForwardIcon from '@/assets/icons/arrows/LineArrowForwardIcon.vue';
import VocabularyIcon from '@/assets/icons/vocabulary/VocabularyIcon.vue';
import AddIcon from '@/assets/icons/actions/AddIcon.vue';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { mapState } from 'pinia';

import WordCard from './WordCard.vue';

export default {
    components: { Button, LineArrowForwardIcon, VocabularyIcon, AddIcon, WordCard },
    computed: {
        ...mapState(useVocabularyStore, ["count", "words"]),
        ...mapState(useLanguagesStore, ["learning_languages"])
    },
    methods: {
        redirectToNewWord() {
            this.$router.push('/new-word');
        }
    }
}
</script>

<template>
    <button class="vocabulary-main-view" @click="redirectToNewWord">
        <div class="vocabulary-main-view--header">

            <h2 class="vocabulary-main-view--title">
                <VocabularyIcon size="32"/>Словарь<span style="color: #737782">{{ count }}</span>
            </h2>

            <div id="forward-arrow">
                <LineArrowForwardIcon size="32"/>
            </div>
        </div>
        <div class="vocabulary-main-view--content">
            <div class="vocabulary-main-view--not-found" v-if="!words.length">
                В словаре пока нет слов или фраз

                <Button @click="redirectToNewWord" size="small" text="Добавить первые слова">
                    <AddIcon size="16"/>
                </Button>
            </div>

            <div class="vocabulary-main-view--words" v-else>
                <div v-for="word in words">
                    <WordCard :word="word"/>
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
            padding-block: 2rem;
            padding-inline: 0.5rem;
            display: flex;
            gap: 1.6rem;
            overflow-y: auto;
            overflow-x: visible;
        }

    }
}
</style>