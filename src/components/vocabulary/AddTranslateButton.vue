<script lang="ts">
import Input from '@/components/UI/input/Input.vue';
import Button from '@/components/header/Button.vue';
import AddIcon from '@/assets/icons/actions/AddIcon.vue';
import ConfirmIcon from '@/assets/icons/actions/ConfirmIcon.vue';
import CloseIcon from '@/assets/icons/actions/CloseIcon.vue';
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import { OnClickOutside } from '@vueuse/components';

export default {
    components: { Input, Button, OnClickOutside, AddIcon, ConfirmIcon, CloseIcon },
    data() {
        return {
            isTranslateFormOpen: false,
            translateLanguage: '',
            wordLanguage: '',
        }
    },
    props: {
        addNewTranslate: {
            type: Function,
            required: true
        }
    },
    methods: {
        handleTranslateForm(state: boolean) {
            this.isTranslateFormOpen = state;
        },
        handleAddTranslate() {
            this.addNewTranslate({
                language: this.translateLanguage,
                text: this.wordLanguage,
            });
            this.translateLanguage = '';
            this.wordLanguage = '';
            this.handleTranslateForm(false);
        }
    },
    computed: {
        ...mapState(useLanguagesStore, ["available_languages"])
    }
}
</script>

<template>
    <OnClickOutside style="width: max-content" @trigger="() => handleTranslateForm(false)">
        <button @click="() => handleTranslateForm(true)" type="button" class="add-translate-button"
            :class="isTranslateFormOpen && 'active'">
            <div class="add-translate-button--not-active" v-if="!isTranslateFormOpen">
                <AddIcon size="16"/>Добавить
            </div>

            <div class="add-translate-button--form" v-if="isTranslateFormOpen">
                <div class="add-translate-button--form-top">
                    <select v-model="translateLanguage">
                        <option v-for="language in available_languages">{{ language.name }}</option>
                    </select>
                </div>

                <div class="add-translate-button--form-bottom">
                    <Input v-model="wordLanguage" placeholder="Введите перевод..." />
                    <Button type="button" view="icon" size="medium" variant="secondary"
                        @click.stop="handleAddTranslate">
                        <ConfirmIcon size="24"/>
                    </Button>
                    <Button type="button" view="icon" size="medium" variant="secondary"
                        @click.stop="() => handleTranslateForm(false)">
                        <CloseIcon size="24"/>
                    </Button>
                </div>
            </div>
        </button>
    </OnClickOutside>
</template>

<style lang="scss" scoped>
.add-translate-button {
    width: 21.6rem;
    height: 12rem;
    padding: 2rem;
    border: .1rem dashed $primary-300;
    background-color: $neutrals-100;
    border-radius: 2rem;
    cursor: pointer;
    text-align: start;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: Inter;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    color: $primary-500;

    &.active {
        width: max-content;
        height: max-content;
        border: 1px solid $primary-300;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        @include hover {
            background-color: $neutrals-100;
            border: 1px solid $primary-500;
        }
    }

    @include hover {
        border: 1px dashed $primary-500;
        background-color: $primary-100;
    }


    .add-translate-button--not-active {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }


    .add-translate-button--form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;

        .add-translate-button--form-top {
            width: 100%;
        }

        .add-translate-button--form-bottom {
            display: flex;
            gap: 1.2rem;
        }
    }
}
</style>