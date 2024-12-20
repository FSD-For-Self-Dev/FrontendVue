<script lang="ts">
import type { PropType } from 'vue';
import type { LanguageCardProps } from '../../types/components/language-card';

export default {
  props: {
    language: {
      type: Object,
      required: true,
    },
    size: {
      type: String as PropType<LanguageCardProps['size']>,
      default: 'small',
    },
  },
  computed: {
    cardClasses() {
      return {
        /* Sizes */
        "card--extra-small": this.size === "extra-small",
        'card--large': this.size === 'large',
        'card--small': this.size === 'small',
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
      $router.push({ name: 'language-profile', params: { slug: language.language.isocode } })
    "
  >
    <div class="card--content">
      <span class="card--name">{{ language.language.name_local }}</span>
      <ul class="card--status-counters">
        <li class="card--status-counters-item">
          <svg-icon
            name="ActiveStatusIcon"
            :size="iconSizes[size]"
            color="var:primary-500"
          />
          <span class="card--status-counters-item--counter">{{
            language.active_words_count
          }}</span>
        </li>
        <li class="card--status-counters-item">
          <svg-icon
            name="Inactive1StatusIcon"
            :size="iconSizes[size]"
            color="var:neutrals-600"
          />
          <span class="card--status-counters-item--counter">{{
            language.inactive_words_count
          }}</span>
        </li>
        <li class="card--status-counters-item">
          <svg-icon
            name="MasteredStatusIcon"
            :size="iconSizes[size]"
            color="var:success-600"
          />
          <span class="card--status-counters-item--counter">{{
            language.mastered_words_count
          }}</span>
        </li>
      </ul>
    </div>
    <div class="card--overlay" v-if="language.cover"></div>
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
      padding: 2.6rem 2.7rem;
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

    .card--content {
      gap: 1.2rem;
      padding: 3.6rem 3.2rem;
      width: 20.4rem;
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

    .card--content {
      gap: 2rem;
      padding: 4rem 4rem;
      width: 30rem;
      height: max-content;
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
      }
    }
  }

  &--content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $white-lucid;
  }

  &--name {
    color: $neutrals-900;
    text-align: center;
  }

  &--status-counters {
    display: flex;
    padding-right: 0.4rem;

    .card--status-counters-item {
      display: flex;
      align-items: center;

      &--counter {
        color: $neutrals-600;
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

  @include hover {
    outline: 0.5 solid $primary-500;

    .card--content {
      outline: $primary-500 0.1rem solid;
      background-color: $white-barely-lucid;
    }

    .card--overlay {
      opacity: 6%;
    }
  }
}
</style>
