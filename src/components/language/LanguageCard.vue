<script lang="ts">
import type { PropType } from 'vue';
import type { LanguageCardProps } from '../../types/components/language-card';
import type { LearningLanguageDto } from '@/dto/languages.dto';

export default {
  props: {
    language: {
      type: Object as PropType<LearningLanguageDto>,
      required: true,
    },
    size: {
      type: String as PropType<LanguageCardProps['size']>,
      default: 'small',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardClasses() {
      return {
        /* Sizes */
        "card--extra-small": this.size === "extra-small",
        'card--large': this.size === 'large',
        'card--small': this.size === 'small',

        'card-disabled': this.disabled,
      };
    },
    iconSizes() {
      return {
        "large": "lg",
        "small": "md",
      };
    },
  },
};
</script>

<template>
  <div
    class="card"
    :class="cardClasses"
    :style="{ backgroundImage: `url(${language.cover})` }"
    @click.stop="
      disabled ? () => {} :
      $router.push({ name: 'language-profile', params: { slug: language.language.isocode } })
    "
  >
    <div class="card--overlay" v-if="language.cover"></div>
    <div class="card--content">
      <div class="card--language">
        <img :src="language.language.flag_icon" alt="Icon" class="language-icon" />
        <span class="card--name">{{ language.language.name_local }}</span>
      </div>
      <ul class="card--status-counters">
        <li class="card--status-counters-item">
          <svg-icon
            name="ActiveStatusIcon"
            :size="iconSizes[size as keyof typeof iconSizes]"
            color="var:primary-500"
          />
          <span class="card--status-counters-item--counter">{{
            language.active_words_count
          }}</span>
        </li>
        <li class="card--status-counters-item">
          <svg-icon
            name="Inactive1StatusIcon"
            :size="iconSizes[size as keyof typeof iconSizes]"
            color="var:neutrals-600"
          />
          <span class="card--status-counters-item--counter">{{
            language.inactive_words_count
          }}</span>
        </li>
        <li class="card--status-counters-item">
          <svg-icon
            name="MasteredStatusIcon"
            :size="iconSizes[size as keyof typeof iconSizes]"
            color="var:success-600"
          />
          <span class="card--status-counters-item--counter">{{
            language.mastered_words_count
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  align-items: center;
  background-size: cover;
  background-color: $neutrals-100;
  outline: 0.1 solid $neutrals-400;
  cursor: pointer;

  &--extra-small {
    padding: 2.9rem 2.1rem;
    width: 22.7rem;
    height: 17.1rem;
    border-radius: $radius-xl;

    .card--content {
      gap: 1.2rem;
      padding: 0.8rem 0.8rem;
      width: 18.3rem;
      height: 11.2rem;
      border-radius: $radius-xl;
    }

    .card--overlay {
      width: 25.2rem;
      height: 18.8rem;
      border-radius: $radius-xl;
    }

    .card--name {
      @include heading-5;
    }

    .card--language {
      max-height: 2.8rem;
      gap: 0.8rem;
    }

    .language-icon {
      width: 2rem;
      height: 2rem;
    }

    .card--status-counters {
      gap: 0.8rem;
    }

    .card--status-counters-item {
      gap: 0;

      &--counter {
        @include heading-6;
      }
    }
  }

  &--small {
    padding: 3.2rem 3.2rem;
    width: 25.2rem;
    height: 18.8rem;
    border-radius: $radius-xl;

    .card--name {
      @include heading-5;
    }

    .card--language {
      max-height: 2.8rem;
      gap: 0.8rem;
    }

    .language-icon {
      width: 2rem;
      height: 2rem;
    }

    .card--content {
      gap: 1.2rem;
      padding: 1.2rem 3.2rem;
      height: 12.4rem;
      border-radius: $radius-xl;
    }

    .card--overlay {
      width: 25.2rem;
      height: 18.8rem;
      border-radius: $radius-xl;
    }

    .card--status-counters {
      gap: 0.8rem;
    }

    .card--status-counters-item {
      gap: 0;

      &--counter {
        @include heading-6;
        max-width: 2.8rem;
      }
    }
  }

  &--large {
    padding: 5.2rem 5.2rem;
    width: 40rem;
    height: 30rem;
    border-radius: $radius-md;

    .card--name {
      @include heading-2;
    }

    .card--language {
      height: 3.8rem;
      gap: 1.6rem;
    }

    .language-icon {
      width: 2.8rem;
      height: 2.8rem;
    }

    .card--content {
      gap: 2rem;
      padding: 4rem 2rem;
      border-radius: $radius-xl;
    }

    .card--overlay {
      width: 40rem;
      height: 30rem;
      border-radius: $radius-xl;
    }

    .card--status-counters {
      gap: 1.2rem;
    }

    .card--status-counters-item {
      gap: 0.2rem;

      &--counter {
        @include heading-4;
        max-width: 4.4rem;
      }
    }
  }

  &--content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $white-lucid;
    width: 100%;
  }

  &--language {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &--name {
    color: $neutrals-900;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-height: 100%;
    max-width: 100%;
    height: 100%;
  }

  &--status-counters {
    display: flex;
    padding-right: 0.4rem;

    .card--status-counters-item {
      display: flex;
      align-items: center;

      &--counter {
        color: $neutrals-600;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-height: 100%;
        max-width: 100%;
      }
    }
  }

  &--overlay {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    background-color: $neutrals-900;
    opacity: 0%;
  }

  &-disabled {
    cursor: default;
  }

  &:hover:not(.card-disabled) {
    outline: 0.5 solid $primary-500;

    .card--content {
      outline: $white-barely-lucid 0.5rem solid;
      background-color: $white-barely-lucid;
    }
  }
}
</style>
