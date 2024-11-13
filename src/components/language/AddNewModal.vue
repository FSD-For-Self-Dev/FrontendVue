<script lang="ts">
import { useLanguagesStore } from '@/store/languages';
import { mapState, mapActions } from 'pinia';
import type { LanguageDto } from '@/dto/languages.dto';
import Button from '@/components/UI/button/Button.vue';
import LanguageIcon from '@/assets/icons/languages/LanguageIcon.vue';
import CloseIcon from '@/assets/icons/actions/CloseIcon.vue';
import { OnClickOutside } from '@vueuse/components';
import { useInfoMessagesStore } from '@/store/info-message';
import { numWord } from '@/utils/numWord';
import ExercisesIcon from '@/assets/icons/ExercisesIcon.vue';
import CloseIcon from '@/assets/icons/CloseIcon.vue';

export default {
    components: { Button, OnClickOutside, LanguageIcon, CloseIcon },
    computed: {
        ...mapState(useLanguagesStore, ["available_languages"])
    },
    data() {
        return {
            activeLanguage: [] as LanguageDto[],
            langWord: ''
        }
    },
    props: {
        closeHandler: {
            type: Function,
            required: true,
        },
    },
    methods: {
        ...mapActions(useLanguagesStore, ["postLearningLanguage", "getAvailableLanguages"]),
        ...mapActions(useInfoMessagesStore, ["addNewMessage"]),
        toggleActiveLanguage(lang: LanguageDto) {
            if (this.activeLanguage.includes(lang)) {
                this.activeLanguage = this.activeLanguage.filter((item) => item.id !== lang.id);
            } else {
                this.activeLanguage.push(lang);
            }
        },
        async handleSave() {
            await this.postLearningLanguage(this.activeLanguage);

            const lenWords = this.activeLanguage.length;
            const addWord = numWord(lenWords, ['Добавлен', 'Добавлено', 'Добавлено'])
            const learnWord = numWord(lenWords, ['изучаемый', 'изучаемых', 'изучаемых']);
            const langWord = numWord(lenWords, ['язык', 'языка', 'языков']);
            this.addNewMessage({ type: 'info', text: `${addWord} ${lenWords} ${learnWord} ${langWord}` })

            await this.getAvailableLanguages();
            this.closeHandler();
        }
    }
}
</script>

<template>
    <OnClickOutside @trigger="() => closeHandler()">
        <div class="modal-add-new">
            <div class="modal-add-new--header">
                <h2 class="modal-add-new--title">
                    <LanguageIcon size="32"/>Добавить изучаемые языки
                </h2>
                <button class="modal-add-new--close" @click="() => closeHandler()">
                    <CloseIcon size="32"/>
                </button>
            </div>
            <div class="modal-add-new--content">
                <div class="modal-add-new--list">
                    <div @click="() => toggleActiveLanguage(lang)" class="modal-add-new--list-item"
                        :class="activeLanguage.includes(lang) && 'active'" v-for="lang in available_languages"
                        :key="lang.id">
                        <img :src="lang.flag_icon" :alt="lang.name" class="modal-add-new--list-item-img">
                        <span class="modal-add-new--list-item-name">{{ lang.name_local }}</span>
                    </div>
                </div>
                <div class="modal-add-new--buttons">
                    <Button variant="secondary" size="medium" @click="() => closeHandler()">
                        Отмена
                    </Button>
                    <Button variant="primary" size="medium" @click="() => handleSave()">
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    </OnClickOutside>
</template>

<style lang="scss" scoped>
.modal-add-new {
    position: fixed;
    top: 64px;
    left: 50%;
    transform: translateX(-50%);
    background-color: $neutrals-100;
    box-shadow: $regular-shadow;
    border-radius: $radius-md;
    display: flex;
    flex-direction: column;
    gap: 5rem;
    justify-content: space-between;
    z-index: 1000;
    padding: 40px;

    .modal-add-new--header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.2rem;

        .modal-add-new--title {
            font-family: 'Inter';
            font-size: 2rem;
            line-height: 2.4rem;
            font-weight: 500;
            color: $neutrals-900;
            display: flex;
            align-items: center;
            gap: 1.2rem;
        }

        .modal-add-new--close {
            cursor: pointer;
            background-color: transparent;
            border: none;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            transition: all 0.2s ease-in-out;

            @include hover {
                color: #{$primary-500};
            }

            @include active {
                color: #{$primary-700};
            }
        }

    }

    .modal-add-new--content {
        display: flex;
        flex-direction: column;
        gap: 4rem;

        .modal-add-new--list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;

            .modal-add-new--list-item {
                font-family: 'Inter';
                font-size: 1.4rem;
                width: 17.5rem;
                border: 1px solid $neutrals-300;
                border-radius: 1.2rem;
                padding: 1.2rem 1.6rem;
                display: flex;
                align-items: center;
                gap: 1.2rem;
                cursor: pointer;
                user-select: none;

                &:hover {
                    border: 1px solid $primary-300;
                }

                &:active {
                    border: 1px solid $primary-500;
                }

                &.active {
                    background-color: $primary-200;
                }
            }
        }

        .modal-add-new--buttons {
            display: flex;
            justify-content: flex-end;
            gap: 1.2rem;
        }
    }


}
</style>
