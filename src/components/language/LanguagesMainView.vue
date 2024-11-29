<script lang="ts">
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import AddLanguagesButton from './AddLanguagesButton.vue';


export default {
    data() {
        return {
            showModal: false
        };
    },
    components: { AddLanguagesButton },
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
                    <div class="languages-main-view--learning-languages-list-item" v-for="lang in learning_languages"
                        :key="lang.id" :style="{ backgroundImage: `url(${lang.cover})` }">
                        <div class="languages-main-view--learning-languages-list-item-content">
                            <span class="languages-main-view--learning-languages-list-item-name">{{
                                lang.language.name_local }}</span>
                            <ul class="languages-main-view--learning-languages-list-info">
                                <li class="languages-main-view--learning-languages-list-info-item">
                                    <svg-icon name="ActiveStatusIcon" size="md" color="var:primary-500" />
                                    <span class="languages-main-view--leaning-languages-counter">{{ lang.active_words_count }}</span>
                                </li>
                                <li class="languages-main-view--learning-languages-list-info-item">
                                    <svg-icon name="Inactive2StatusIcon" size="md" color="var:neutrals-600" />
                                    <span class="languages-main-view--leaning-languages-counter">{{ lang.inactive_words_count }}</span>
                                </li>
                                <li class="languages-main-view--learning-languages-list-info-item">
                                    <svg-icon name="MasteredStatusIcon" size="md" color="var:success-600" />
                                    <span class="languages-main-view--leaning-languages-counter">{{ lang.mastered_words_count }}</span>
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

            .languages-main-view--learning-languages-list-item {
                padding: 3.2rem 3.2rem;
                width: 25.2rem;
                height: 18.8rem;
                display: flex;
                align-items: center;
                border-radius: 2rem;
                background-size: cover;

                .languages-main-view--learning-languages-list-item-content {
                    gap: 1.2rem;
                    padding: 3.6rem 3.2rem;
                    width: 20.4rem;
                    height: 12.4rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 2rem;
                    background-color: rgba(255, 255, 255, 0.8);

                    .languages-main-view--learning-languages-list-item-name {
                        @include heading-5;
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
                display: flex;
                align-items: center;
            }

            .languages-main-view--leaning-languages-counter {
                @include heading-6;
                color: $neutrals-600;
            }
        }

    }
}
</style>