<script lang="ts">
import ArrowBackwardIcon from "@/components/icons/ArrowBackwardIcon.vue";
import ArrowForwardIcon from "@/components/icons/ArrowForwardIcon.vue";
import CopyIcon from "@/components/icons/CopyIcon.vue";
import MoreIcon from "@/components/icons/MoreIcon.vue";
import FavouriteIcon from "@/components/icons/FavouriteIcon.vue";
import Inactive2StatusIcon from "@/components/icons/Inactive2StatusIcon.vue";
import Inactive3StatusIcon from "@/components/icons/Inactive3StatusIcon.vue";
import ActiveStatusIcon from "@/components/icons/ActiveStatusIcon.vue";
import MasteredStatusIcon from "@/components/icons/MasteredStatusIcon.vue";
import QuoteLeftIcon from "@/components/icons/QuoteLeftIcon.vue";
import { heroWords, itWords, languageCards } from "@/constants/wordsMock";

export default {
  components: { ArrowBackwardIcon, ArrowForwardIcon, CopyIcon, MoreIcon, FavouriteIcon, ActiveStatusIcon, MasteredStatusIcon, Inactive2StatusIcon, Inactive3StatusIcon, QuoteLeftIcon },
  data() {
    return {
      heroWords,
      itWords,
      languageCards,
    }
  }
}
</script>

<template>
  <div class="page-wrapper">
    <section class="hero">
      <div class="hero-words">
        <div class="hero-word" v-for="word in heroWords">
          {{ word.text }}
        </div>
      </div>
      <h1 class="hero-title">
        Уникальная веб-платформа для тех, кто изучает языки!
      </h1>
      <p class="hero-subtitle">
        Создавай и персонализируй свой собственный словарь, выполняй упражнения, пополняй свой словарный запас с
        огромной скоростью!
      </p>
      <div class="hero-cards">
        <div class="hero-card card-1">
          <div class="card-header">
            <span class="card-status">
              <ActiveStatusIcon size="16"/>Активное
            </span>
            <span class="card-actions">
              <FavouriteIcon size="24"/>
              <MoreIcon size="24"/>
            </span>
          </div>
          <div class="card-main">
            <span class="card-flag">
              <!-- fix needed: language icon -->
            </span>
            <div class="card-content">
              <span class="part-of-speech">СУЩЕСТВИТЕЛЬНОЕ</span>
              <h2 class="card-word">Spiaggia
                <CopyIcon size="16"/>
              </h2>
              <div class="card-tags">
                <span class="card-tag">
                  ОТПУСК
                </span>
                <span class="card-tag">
                  A1
                </span>
              </div>
            </div>
          </div>
          <div class="card-translation">
            <p class="card-translation-word">Пляж</p>
            <p class="card-translation-info">1/1</p>
          </div>
        </div>
        <div class="hero-card card-2">
        </div>
        <div class="hero-card card-3">
        </div>
        <div class="hero-card card-4">
          <div class="card-4-content stacked-card stacked-card-1">
            <div class="card-4-header">
              <div class="card-4-name">
                <h5 class="card-4-title">Айти словечки</h5>
                <span class="card-4-subtitle">Часто используются в IT сфере</span>
              </div>
              <div class="card-4-actions">
                <FavouriteIcon size="24"/>
                <MoreIcon size="24"/>
              </div>
            </div>
            <div class="card-4-footer">

              <ul class="card-4-list">
                <li class="card-4-item" v-for="itWord in itWords">{{ itWord.text }}</li>
              </ul>
              <div class="card-4-count">
                <div class="card-4-count-content">
                  49
                </div>
              </div>
            </div>
          </div>
          <div class="stacked-card stacked-card-2">
          </div>
          <div class="stacked-card stacked-card-3">
          </div>
        </div>
        <div class="hero-card card-5">
          <div class="card-header">
            <span class="card-status">
              <Inactive3StatusIcon size="16"/>Почти активное
            </span>
            <span class="card-actions">
              <FavouriteIcon size="24"/>
              <MoreIcon size="24"/>
            </span>
          </div>
          <div class="card-main">
            <span class="card-flag">
              <!-- fix needed: language icon -->
            </span>
            <div class="card-content">
              <span class="part-of-speech">ГЛАГОЛ</span>
              <h2 class="card-word">Develop
                <CopyIcon size="16"/>
              </h2>
              <div class="card-tags">
                <span class="card-tag">
                  IT
                </span>
                <span class="card-tag">
                  A1
                </span>
              </div>
            </div>
          </div>
          <div class="card-translation">
            <div class="card-translation-actions">
              <button class="card-translation-navigation">
                <ArrowBackwardIcon size="24" class="card-translation-navigation-icon" />
              </button>
              <p class="card-translation-word">Разрабатывать</p>
              <button class="card-translation-navigation">
                <ArrowForwardIcon size="24" class="card-translation-navigation-icon" />
              </button>
            </div>
            <p class="card-translation-info">1/1</p>
          </div>
        </div>
        <div class="hero-card card-6">
          <QuoteLeftIcon size="32"/>
          <div class="card-6-content">
            <h2 class="card-6-title">I need a vacation</h2>
            <p class="card-6-subtitle">by no author</p>
          </div>
        </div>
        <div class="hero-card card-7">
          <div class="card-7-content">
            <p class="card-7-word">Vacaciones</p>
            <p class="card-7-word">Vacation</p>
            <p class="card-7-more">Еще 5</p>
          </div>
        </div>
        <div class="hero-card language-card" v-for="languageCard in languageCards"
          :style="{ backgroundImage: 'url(' + languageCard.backgroundImage + ')' }" :class="languageCard.class">
          <div class="language-card-content">
            <h3 class="language-card-title">{{ languageCard.languageName }}</h3>
            <div class="language-card-activities">
              <div class="language-card-activity">
                <ActiveStatusIcon size="16"/>{{ languageCard.activeStatus }}
              </div>
              <div class="language-card-activity">
                <Inactive2StatusIcon size="16"/>{{ languageCard.inactiveStatus }}
              </div>
              <div class="language-card-activity">
                <MasteredStatusIcon size="16"/>{{ languageCard.markedStatus }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
icon {
  width: 0.5rem;
}

.hero-words {
  width: 77.9rem;
  margin: auto;
}

.hero-word {
  display: inline-block;
  position: relative;

  height: 4.4rem;
  background-color: $primary-100;
  color: $primary-600;
  padding: 1.2rem 2rem;
  border-radius: 4rem;
}

.hero-word:nth-child(1) {
  top: 4rem;
  left: 6rem;
}

.hero-word:nth-child(2) {
  top: 1.1rem;
  left: 7rem;
  transform: rotate(357deg);
}

.hero-word:nth-child(3) {
  top: 4.5rem;
  left: 3rem;
  transform: rotate(345deg);
}

.hero-word:nth-child(4) {
  top: 2.4rem;
  left: 3rem;
  transform: rotate(337deg);
}

.hero-word:nth-child(5) {
  top: 5.8rem;
  left: 1.5rem;
  transform: rotate(-345deg);
}

.hero-word:nth-child(6) {
  top: 5rem;
  transform: rotate(-330deg);
}

.hero-word:nth-child(7) {
  top: 7rem;
  transform: rotate(-330deg);
}

.hero-word:nth-child(8) {
  top: 4.3rem;
  transform: rotate(345deg);
}

.hero-word:nth-child(9) {
  top: 7.5rem;
  transform: rotate(353deg);
}

.hero-word:nth-child(10) {
  top: 6.5rem;
  left: 2rem;
  transform: rotate(-355deg);
}

.hero-word:nth-child(11) {
  top: 9rem;
  left: 4rem;
  transform: rotate(355deg);
}

.hero-title {
  width: 80%;
  margin: auto;
  margin-top: 10rem;
  text-align: center;
  color: $primary-700;
  font-size: 6rem;
  font-weight: 700;
  line-height: 7.5rem;
}

.hero-subtitle {
  width: 80%;
  margin: auto;
  text-align: center;
  color: $primary-600;
  font-size: 2rem;
  line-height: 2.4rem;
}

.hero-cards {
  margin-top: 5rem;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "card1 card1 card4 card4 card6 card6 card8 "
    "card1 card1 card4 card4 card6 card6 card8 "
    "card1 card1 card5 card5 card6 card6 card9 "
    "card1 card1 card5 card5 card7 card7 card9 "
    "card2 card3 card5 card5 card7 card7 card10 "
    "card2 card3 card5 card5 card7 card7 card10 ";
}

.hero-card {
  border-radius: 2rem;
}

.card-1 {
  grid-area: card1;
  background-image: url(".././assets/images/adpage-image1.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.card-2 {
  grid-area: card2;
  background-image: url(".././assets/images/adpage-image2.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.card-3 {
  grid-area: card3;
  background-image: url(".././assets/images/adpage-image3.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.card-4 {
  grid-area: card4;
}

.card-4-content {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 10;
}

.card-4-header {
  display: flex;
  justify-content: space-between;
}

.card-4-subtitle {
  color: $primary-700;
}

.card-4-footer {
  display: flex;
  justify-content: space-between;
}

.card-4-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.5rem 2.5rem;
  max-height: 7rem;
}

.card-4-count {
  display: inline-flex;
  align-items: flex-end;
}

.card-4-count-content {
  background-color: $primary-500;
  color: $neutrals-100;
  padding: 0.8rem 0.7rem;
  border-radius: 0.8rem;
}

.card-5 {
  grid-area: card5;
  background-image: url("../assets/images/adpage-image4.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

}

.card-6 {
  grid-area: card6;
  background-color: $primary-100;
  border: 1px solid $primary-500;
  padding: 3.2rem 2.4rem;
}

.card-6-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.6rem;
  height: calc(100% - 3.2rem);
}

.card-6-subtitle {
  color: $primary-500;
  font-size: 2rem;
}

.card-7 {
  grid-area: card7;
  background-image: url("../assets/images/adpage-image5.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 1.2rem;
}

.card-7-content {
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.6rem 2rem;
  border-radius: 1.6rem;
  background-color: $neutrals-100;
  opacity: 0.8;
}

.card-7-word {
  font-size: 1.6rem;
  color: $neutrals-900;
  font-weight: 500;
}

.card-7-more {
  font-size: 1.4rem;
  color: $neutrals-600;
}

.card-8 {
  grid-area: card8;
}

.card-9 {
  grid-area: card9;
}

.card-10 {
  grid-area: card10;
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.card-status {
  display: flex;
  align-items: center;
  background-color: $neutrals-100;
  padding: 0.8rem 1.2rem 0.8rem 0.8rem;
  border-radius: 2rem;
  gap: 0.5rem;
}

.card-actions {
  display: flex;
  align-items: center;
  background-color: $neutrals-100;
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
}

.card-main {
  background-color: $neutrals-100;
  border: 1px solid $neutrals-400;
  opacity: 0.8;
  padding: 2rem 0;
  border-radius: 1.6rem;
}

.card-flag {
  margin-left: 1.2rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.part-of-speech {
  position: relative;
  bottom: 1.8rem;
}

.card-tags {
  display: flex;
  gap: 0.6rem;
}

.card-tag {
  background-color: $secondary-300;
  color: $secondary-700;
  border: 1px solid $secondary-400;
  border-radius: 0.8rem;
  padding: 0.6rem 1.2rem;
  margin: 2.2rem 0 0 0;
}

.card-translation {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $neutrals-100;
  border-radius: 1.6rem;
  opacity: 0.8;
  padding: 1.2rem 0;
}

.card-translation-actions {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.card-translation-navigation {
  cursor: pointer;
  border: none;
  outline: none;
  background-color: inherit;
}

.card-translation-navigation-icon {
  width: 3rem;
  height: 2rem;
}

.card-translation-word {
  font-size: 1.6rem;
  line-height: 2rem;
}

.card-translation-info {
  font-size: 1rem;
  line-height: 1.2rem;
  color: $neutrals-600;
}

.language-card {
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2.4rem 1.4rem;
}

.language-card-content {
  background-color: $neutrals-100;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1.2rem;
  padding: 3.2rem;
  opacity: 0.8;
}

.language-card-activities {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.language-card-activity {
  display: flex;
  align-items: center;
}

.language-card-title {
  font-size: 2rem;
}

.card-4 {
  position: relative;
}

.stacked-card {
  position: absolute;
  border-radius: 2rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s ease;
}

.stacked-card-1 {
  top: 0;
  left: 0;
  z-index: 3;
  transform: translateX(0px) translateY(0px);
  width: 37rem;
  height: 18rem;
  background-color: $primary-300;
}

.stacked-card-2 {
  left: 1rem;
  z-index: 2;
  width: 37rem;
  height: 18rem;
  background-color: $primary-300;
  box-shadow: 0 0 0.8rem 0 rgba(17, 17, 26, 0.1), 0 0.1rem 0 0 rgba(17, 17, 26, 0.05);
  background: rgba(92, 119, 210, 0.6);
  transform: rotate(-357deg);
}

.stacked-card-3 {
  left: 2rem;
  z-index: 1;
  width: 36.5rem;
  height: 18rem;
  background-color: $primary-300;
  transform: rotate(-355deg);
}
</style>