<script lang="ts">
import AddNewLanguageModal from '@/components/language/AddNewModal.vue';
import Button from '@/components/UI/button/Button.vue';
import Icon from '@/components/UI/icon/Icon.vue';
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';

export default {
    data() {
        return {
            isLanguageModalOpen: false,
        };
    },
    components: { Button, AddNewLanguageModal, Icon },
    computed: {
        ...mapState(useLanguagesStore, ['learning_languages', 'count'])
    },
    methods: {
        openLanguageModal(event: Event) {
            event.stopPropagation();
            this.isLanguageModalOpen = true;
        },
        toggleLanguageModal(event: Event) {
            event.stopPropagation();
            this.isLanguageModalOpen = !this.isLanguageModalOpen;
        },
        closeModal() {
            this.isLanguageModalOpen = false;
        }
    },
}
</script>

<template>
    <button class="languages-main-view" @click="toggleLanguageModal">
        <div class="languages-main-view--header">

            <h2 class="languages-main-view--title">
                <Icon name="language-all" width="32" height="32" />Изучаемые языки <span
                    style="color: #737782">{{ count }}</span>
            </h2>

            <Icon name="arrow-forward-default" width="32" height="32" />
        </div>
        <div class="languages-main-view--content">
            <div class="languages-main-view--not-found-learning-languages" v-if="learning_languages.length === 0">
                Нет изучаемых языков
                <Button @click="openLanguageModal" size="small" icon="plus">Добавить
                    изучаемый язык
                </Button>

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
                                    <Icon name="active-click" width="24" height="24" />{{ lang.active_words_count }}
                                </li>
                                <li class="languages-main-view--learning-languages-list-info-item">
                                    <Icon name="inactive-click" width="24" height="24" />{{ lang.inactive_words_count }}
                                </li>
                                <li class="languages-main-view--learning-languages-list-info-item">
                                    <Icon name="mastered-default" width="18" height="18" />{{ lang.mastered_words_count
                                    }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </button>
    <AddNewLanguageModal :close-handler="closeModal" v-if="isLanguageModalOpen" />
</template>

<style lang="scss">
.languages-main-view {
    background-color: $neutrals-100;
    padding: 40px;
    border-radius: 2rem;
    box-shadow: $regular-shadow;
    border: 1px solid transparent;
    cursor: pointer;
    width: 100%;

    @include hover {
        border: 1px solid $primary-300;
    }

    @include active {
        border: 1px solid $primary-500;
    }


    .languages-main-view--header {
        padding-bottom: 2rem;
        border-bottom: 0.1rem solid $neutrals-400;
        display: flex;
        justify-content: space-between;
        align-items: center;

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

        .languages-main-view--not-found-learning-languages {
            font-style: 'Inter';
            font-size: 1.6rem;
            line-height: 2rem;
            font-weight: 400;

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