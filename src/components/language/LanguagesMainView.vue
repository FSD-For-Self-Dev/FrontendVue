<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import ArrowForwardIcon from '@/assets/icons/ArrowForwardIcon.vue';
import LineArrowForwardIcon from '@/assets/icons/LineArrowForwardIcon.vue';
import LanguageIcon from '@/assets/icons/LanguageIcon.vue';
import AddIcon from '@/assets/icons/AddIcon.vue';
import TrophyStatusIcon from '@/assets/icons/TrophyStatusIcon.vue';
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import Inactive2StatusIcon from '@/assets/icons/Inactive2StatusIcon.vue';
import ActiveStatusIcon from '@/assets/icons/ActiveStatusIcon.vue';
import LanguageButtonForModal from './LanguageButtonForModal.vue';
import MasteredStatusIcon from '@/assets/icons/MasteredStatusIcon.vue';


export default {
    data() {
        return {
            showModal: false
        };
    },
    components: { LanguageButtonForModal, Button, ArrowForwardIcon, LineArrowForwardIcon, LanguageIcon, AddIcon, TrophyStatusIcon, ActiveStatusIcon, MasteredStatusIcon, Inactive2StatusIcon },
    computed: {
        ...mapState(useLanguagesStore, ['learning_languages', 'count'])
    },
    methods: {
        handleView() {
            if (this.count > 0) {
                this.$router.push('/languages');
            } else {
                this.handleToggleModal(!this.showModal);
            }
        },
        handleToggleModal(state: boolean) {
            this.showModal = state;
        }
    },
}
</script>

<template>
    <button class="languages-main-view" @click="handleView">
        <div class="languages-main-view--header">

            <h2 class="languages-main-view--title">
                <LanguageIcon size="32" />Изучаемые языки <span style="color: #737782">{{ count
                    }}</span>
            </h2>

            <div id="forward-arrow">
                <LineArrowForwardIcon size="32" />
            </div>
        </div>
        <div class="languages-main-view--content">
            <div class="languages-main-view--not-found-learning-languages" v-if="learning_languages.length === 0">
                Нет изучаемых языков

                <LanguageButtonForModal :extra-toggle-modal="handleToggleModal" :extra-show-modal="showModal"
                    text-button="Добавить первый язык" />

            </div>

            <div class="languages-main-view--learning-languages" v-else>
                <div class="languages-main-view--learning-languages-list">
                    <div class="languages-main-view--learning-languages-list-item" v-for="lang in learning_languages"
                        :key="lang.id" :style="{ backgroundImage: `url(${lang.cover})` }">
                        <div class="languages-main-view--learning-languages-list-item-content">
                            <span class="languages-main-view--learning-languages-list-item-name">{{
                                lang.language.name_local }}</span>
                            <ul class="languages-main-view--learning-languages-list-info">
                                <li class="languages-main-view--learning-languages-list-info-item">
                                    <ActiveStatusIcon size="16" custom-color="#6C8DFF" />{{ lang.active_words_count }}
                                </li>
                                <li class="languages-main-view--learning-languages-list-info-item">
                                    <Inactive2StatusIcon size="16" custom-color="#737782" />{{ lang.inactive_words_count
                                    }}
                                </li>
                                <li class="languages-main-view--learning-languages-list-info-item">
                                    <MasteredStatusIcon size="16" custom-color="#2FBC48" />{{ lang.mastered_words_count
                                    }}
                                </li>
                            </ul>
                        </div>
                    </div>
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
    min-height: 36.5rem;
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
            font-family: 'Inter';
            font-size: 2rem;
            line-height: 2.4rem;
            font-weight: 500;
            display: flex;
            gap: 0.8rem;
            align-items: center;

        }
    }

    .languages-main-view--content {
        padding-top: 2rem;
        width: 100%;

        .languages-main-view--not-found-learning-languages {
            font-style: 'Inter';
            font-size: 1.6rem;
            line-height: 2rem;
            font-weight: 400;
            text-align: left;

            display: flex;
            justify-content: space-between;
        }

        .languages-main-view--learning-languages-list {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;


            .languages-main-view--learning-languages-list-item {
                padding: 3.2rem 2.4rem;
                width: 18.8rem;
                border-radius: 2rem;
                background-size: cover;

                .languages-main-view--learning-languages-list-item-content {
                    padding: 3.2rem 4.2rem;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 2rem;
                    background-color: rgba(255, 255, 255, 0.8);

                    .languages-main-view--learning-languages-list-item-name {
                        font-family: 'Inter';
                        font-size: 1.6rem;
                        line-height: 2rem;
                        font-weight: 400;
                        color: $neutrals-900;
                        text-align: center;
                    }
                }

            }
        }

        .languages-main-view--learning-languages-list-info {
            display: flex;
            gap: 0.8rem;

            .languages-main-view--learning-languages-list-info-item {
                font-family: 'Inter';
                font-size: 1.2rem;
                line-height: 1.6rem;
                font-weight: 400;
                color: $neutrals-600;
                display: flex;
                align-items: center;
            }
        }

    }
}
</style>