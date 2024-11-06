<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import Icon from '@/components/UI/icon/Icon.vue';
import AddNewModal from './AddNewModal.vue';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { mapState } from 'pinia';

export default {
    components: { Button, Icon, AddNewModal },
    data() {
        return {
            isVocabularyOpen: false,
        };
    },
    computed: {
        ...mapState(useVocabularyStore, ["count", "words"]),
        ...mapState(useLanguagesStore, ["learning_languages"])
    },
    methods: {
        openVocabularyModal(event: Event) {
            event.stopPropagation();
            this.isVocabularyOpen = true;
        },
        toggleVocabularyModal(event: Event) {
            event.stopPropagation();
            this.isVocabularyOpen = !this.isVocabularyOpen;
        },
        closeModal() {
            this.isVocabularyOpen = false;
        }
    },
}
</script>

<template>
    <button class="vocabulary-main-view" @click="toggleVocabularyModal">
        <div class="vocabulary-main-view--header">
            <h2 class="vocabulary-main-view--title">
                <Icon name="vocabulary" width="32" height="32" />Словарь <span style="color: #737782">{{ count }}</span>
            </h2>

            <Icon name="arrow-forward-default" width="32" height="32" />
        </div>
        <div class="vocabulary-main-view--content">
            <div class="vocabulary-main-view--not-found" v-if="!words.length">
                В словаре пока нет слов или фраз

                <Button @click="toggleVocabularyModal" size="small">Добавить первые слова</Button>
            </div>

            <div class="vocabulary-main-view--words" v-else>
                <div class="vocabulary-main-view--word" v-for="word in words">
                    <img width="16"
                        :src="learning_languages.find(lang => lang.language.name === word.language)?.language.flag_icon" />
                    {{ word.text }}
                </div>
            </div>
        </div>
    </button>

    <Teleport to="body">
        <AddNewModal :close-handler="closeModal" v-if="isVocabularyOpen" />
    </Teleport>
</template>

<style lang="scss">
.vocabulary-main-view {
    width: 100%;
    background-color: $neutrals-100;
    padding: 40px;
    border-radius: 2rem;
    box-shadow: $regular-shadow;
    border: 1px solid transparent;
    cursor: pointer;

    @include hover {
        border: 1px solid $primary-300;
    }

    @include active {
        border: 1px solid $primary-500;
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

            display: flex;
            justify-content: space-between;
        }


        .vocabulary-main-view--words {
            display: flex;
            gap: 1.6rem;

            .vocabulary-main-view--word {
                padding: 1.6rem 2rem;
                background-color: $neutrals-100;
                border-radius: 2rem;
                border: .1rem solid $neutrals-300;

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