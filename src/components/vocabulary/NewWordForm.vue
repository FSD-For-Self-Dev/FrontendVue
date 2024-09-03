<template>
    <form class="new-word--form">
        <select v-model="language">
            <option v-for="language in learning_languages">{{ language.language.name_local }}</option>
        </select>
        <Input v-model="text" placeholder="Введите слово..." />
        <div class="new-word--translates">
            <AddTranslateButton :addNewTranslate="addNewTranslate" />
            <div class="new-word--translate" v-for="translate in translations"><img width="16"
                    :src="available_languages.find(lang => lang.name === translate.language)?.flag_icon" /> {{
                        translate.text }}
            </div>
        </div>
        <div class="new-word--buttons">
            <Button type="button" size="medium" variant="secondary">Отмена</Button>
            <Button type="submit" @click.prevent="handleSubmit" size="medium">Сохранить</Button>
        </div>
    </form>
</template>

<script lang="ts">
import { toRaw } from 'vue';
import Input from '@/components/UI/input/Input.vue';
import Icon from '@/components/UI/icon/Icon.vue';
import CircleButton from '../UI/circle-button/CircleButton.vue';
import { mapActions, mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import Button from '../UI/button/Button.vue';
import AddTranslateButton from './AddTranslateButton.vue';
import type { WordTranslationDto } from '@/dto/vocabulary.dto';
import { useVocabularyStore } from '@/store/vocabulary';

export default {
    components: { Input, Icon, CircleButton, Button, AddTranslateButton },
    data() {
        return {
            translations: [] as WordTranslationDto[],
            language: '',
            text: ''
        }
    },
    methods: {
        addNewTranslate(word: WordTranslationDto) {
            this.translations.push(word);
        },
        ...mapActions(useVocabularyStore, ["createWord", "getVocabulary"]),
        handleSubmit() {
            this.createWord({
                text: this.text,
                language: this.language,
                translations: this.translations
            }).finally(() => {
                this.text = '';
                this.translations = [];
                this.getVocabulary();
                this.$router.push('/')
            });
        }
    },
    computed: {
        ...mapState(useLanguagesStore, ["learning_languages", "available_languages"])
    },
}
</script>

<style lang="scss">
.new-word--form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.new-word--translates {
    display: grid;
    gap: 1.6rem;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
}

.new-word--translate {
    height: 12rem;
    padding: 2rem;
    border: .1rem solid $neutrals-400;
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
    color: $neutrals-900;

}

.new-word--buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1.6rem;
}
</style>