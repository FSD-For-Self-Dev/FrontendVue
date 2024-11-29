<script lang="ts">
import type { WordDto } from '@/dto/vocabulary.dto';
import ActiveStatusIcon from '@/assets/icons/vocabulary/status/ActiveStatusIcon.vue';
import MasteredStatusIcon from '@/assets/icons/vocabulary/status/MasteredStatusIcon.vue';
import Inactive3StatusIcon from '@/assets/icons/vocabulary/status/Inactive3StatusIcon.vue';
import EnglishIcon from '@/assets/icons/languages/EnglishIcon.vue';
import FrenchIcon from '@/assets/icons/languages/FrenchIcon.vue';
import SpanishIcon from '@/assets/icons/languages/SpanishIcon.vue';
import GermanIcon from '@/assets/icons/languages/GermanIcon.vue';
import ItalianIcon from '@/assets/icons/languages/ItalianIcon.vue';
import RussianIcon from '@/assets/icons/languages/RussianIcon.vue';
import JapaneseIcon from '@/assets/icons/languages/JapaneseIcon.vue';
import type { PropType } from 'vue';

export default {
    components: {
        ActiveStatusIcon,
        MasteredStatusIcon,
        Inactive3StatusIcon,
        EnglishIcon,
        FrenchIcon,
        SpanishIcon,
        GermanIcon,
        ItalianIcon,
        RussianIcon,
        JapaneseIcon,
    },
    props: {
        word: {
            type: Object as PropType<WordDto>,
            required: true,
        },
    },
    computed: {
        backgroundClasses() {
            return {
                grey: !this.word.image,
                ghost: this.word.image,
            };
        },
        activityStatus() {
            switch (this.word.activity_status) {
                case 'Active':
                    return 'Активное';
                case 'Inactive':
                    return 'Неактивное';
                case 'Mastered':
                    return 'Усвоенное';
            }
        },
    },
};
</script>

<template>
    <article class="card">
        <div class="card__background" v-if="word.image">
            <img :src="word.image" alt="Word image" />
        </div>
        <div class="card__header">
            <div class="card__header--status" :class="backgroundClasses">
                <ActiveStatusIcon
                    size="24"
                    customColor="#6c8dff"
                    v-if="word.activity_status === 'Active'"
                />
                <Inactive3StatusIcon
                    size="24"
                    customColor="#6c8dff"
                    v-if="word.activity_status === 'Inactive'"
                />
                <MasteredStatusIcon
                    size="24"
                    customColor="#6c8dff"
                    v-if="word.activity_status === 'Mastered'"
                />
                <span>{{ activityStatus }}</span>
            </div>
            <div class="card__header--actions" :class="backgroundClasses">
                Actions
            </div>
        </div>
        <div class="card__content" :class="backgroundClasses">
            <h3>{{ word.language }}</h3>
            <div class="card__content--language">
                <EnglishIcon size="24" v-if="word.language === 'English'" />
                <FrenchIcon size="24" v-if="word.language === 'French'" />
                <SpanishIcon size="24" v-if="word.language === 'Spanish'" />
                <GermanIcon size="24" v-if="word.language === 'German'" />
                <ItalianIcon size="24" v-if="word.language === 'Italian'" />
                <RussianIcon size="24" v-if="word.language === 'Russian'" />
                <JapaneseIcon size="24" v-if="word.language === 'Japanese'" />
            </div>
        </div>
        <div class="card__footer" :class="backgroundClasses">Footer</div>
    </article>
</template>

<style lang="scss" scoped>
.ghost,
.grey {
    border-radius: $radius-sm;
    border: 0.1rem solid $neutrals-300;
    z-index: 1;
}
.ghost {
    background-color: rgba(255, 255, 255, 0.8);
}

.grey {
    background-color: $neutrals-200;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 29.5rem;
    height: 34rem;
    border-radius: $radius-sm;
    padding-block: 1.6rem;
    padding-inline: 2rem;
    box-shadow: 0px 0px 8px 0px #11111a1a;

    &__background {
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        background-color: $neutrals-600;
        border-radius: $radius-sm;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__header {
        display: flex;
        justify-content: space-between;

        &--status {
            @include padding(0.8, 0.8, 0.1);
            display: flex;
            align-items: center;
            gap: 0.4rem;

            span {
                font-size: 1.4rem;
                line-height: 1.6rem;
                font-weight: 500;
                color: $neutrals-900;
            }
        }

        &--actions {
            padding: 0.8rem;
        }
    }
}
</style>
