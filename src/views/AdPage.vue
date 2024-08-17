<script lang="ts">
import PageLayout from "@/components/UI/page-layout/PageLayout.vue";
import Header from "@/components/header/Header.vue";
import Icon from "@/components/UI/icon/Icon.vue";

export default {
  components: {Icon, Header, PageLayout},
  data() {
    return {
      heroWords:[
          "Примеры",
          "Коллекции",
          "Переводчик",
          "Упражнения",
          "Антонимы",
          "Определения",
          "Синонимы",
          "Переводы",
          "Ассоциации",
          "Мой словарь",
          "Избранное"
      ],
      itWords:[
          "Dunder method",
          "Linter",
          "Framework",
          "Agile",
          "Software",
          "Database"
      ],
      languageCards:[
        {
          languageName:"Español",
          backgroundImage:"src/assets/images/adpage-image6.png",
          activeStatus:56,
          inactiveStatus:3,
          markedStatus:1,
          class:"card-8"
        },
        {
          languageName:"Italiano",
          backgroundImage:"src/assets/images/adpage-image7.png",
          activeStatus:56,
          inactiveStatus:3,
          markedStatus:1,
          class:"card-9"
        },
        {
          languageName:"Deutsch",
          backgroundImage:"src/assets/images/adpage-image8.png",
          activeStatus:56,
          inactiveStatus:3,
          markedStatus:1,
          class:"card-10"
        },
      ] as Array<{ languageName: string; backgroundImage: string; activeStatus:number; inactiveStatus:number; markedStatus:number; class:string }>
    }
  }
}
</script>

<template>
  <PageLayout>
    <div class="page-wrapper">
      <section class="hero">
        <div class="hero-words">
          <div class="hero-word" v-for="word in heroWords">
            {{word}}
          </div>
        </div>
        <h1 class="hero-title">
          Уникальная веб-платформа для тех, кто изучает языки!
        </h1>
        <p class="hero-subtitle">
          Создавай и персонализируй свой собственный словарь, выполняй упражнения,  пополняй свой словарный запас с огромной скоростью!
        </p>
        <div class="hero-cards">
          <div class="hero-card card-1">
            <div class="card-header">
              <span class="card-status">
                <Icon name="active-click"/>Активное
              </span>
              <span class="card-actions">
                <Icon name="favourite-default"/>
                <Icon name="more-default"/>
              </span>
            </div>
            <div class="card-main">
              <span class="card-flag">
                <Icon name="italian"/>
              </span>
              <div class="card-content">
                <span class="part-of-speech">СУЩЕСТВИТЕЛЬНОЕ</span>
                <h2 class="card-word">Spiaggia <Icon name="copy-default" class="interactive-icon"/> </h2>
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
                  <Icon name="favourite-default" class="interactive-icon"/>
                  <Icon name="more-default" class="interactive-icon"/>
                </div>
              </div>
              <div class="card-4-footer">

                <ul class="card-4-list">
                  <li class="card-4-item" v-for="itWord in itWords">{{itWord}}</li>
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
                <Icon name="time"/>Почти активное
              </span>
              <span class="card-actions">
                  <Icon name="favourite-default" class="interactive-icon"/>
                  <Icon name="more-default" class="interactive-icon"/>
              </span>
            </div>
            <div class="card-main">
              <span class="card-flag">
                <Icon name="english (UK)"/>
              </span>
              <div class="card-content">
                <span class="part-of-speech">ГЛАГОЛ</span>
                <h2 class="card-word">Develop <Icon name="copy-default" class="interactive-icon"/>   </h2>
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
                  <img src="../assets/icons/arrow-back-default.svg" alt="arrow back button navigation"/>
                </button>
                <p class="card-translation-word">Разрабатывать</p>
                <button class="card-translation-navigation">
                  <img src="../assets/icons/arrow-forward-default.svg" alt="arrow forward button navigation"/>
                </button>
              </div>
              <p class="card-translation-info">1/1</p>
            </div>
          </div>
          <div class="hero-card card-6">
            <img src="../assets/icons/word-forms.svg" alt="quotes icon" class="card-6-icon"/>
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
          <div class="hero-card language-card" v-for="languageCard in languageCards"  :style="{ backgroundImage: 'url(' + languageCard.backgroundImage + ')' }" :class="languageCard.class">
            <div class="language-card-content">
              <h3 class="language-card-title">{{languageCard.languageName}}</h3>
              <div class="language-card-activities">
                <div class="language-card-activity">
                  <img src="../assets/icons/active-click.svg" alt="activity icon"/>{{languageCard.activeStatus}}
                </div>
                <div class="language-card-activity">
                  <img src="../assets/icons/activity-status.svg" alt="activity icon"/>{{languageCard.inactiveStatus}}
                </div>
                <div class="language-card-activity">
                  <img src="../assets/icons/activity-status.svg" alt="activity icon"/>{{languageCard.markedStatus}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </PageLayout>
</template>

<style scoped lang="scss">
.hero{
}
.hero-words{
    width: 779px;
    margin: auto;
}
.hero-word{
    display: inline-block;
    position: relative;

    height: 44px;
    background-color: $primary-100;
    color: $primary-600;
    padding: 12px 20px 12px 20px;
    border-radius: 40px;
}

.hero-word:nth-child(1){
  top:40px;
  left: 60px;
}
.hero-word:nth-child(2){
  top: 11px;
  left: 70px;
  transform: rotate(357deg);
}
.hero-word:nth-child(3){
  top: 45px;
  left: 30px;
  transform: rotate(345deg);
}
.hero-word:nth-child(4){
  top: 24px;
  left: 30px;
  transform: rotate(337deg);
}
.hero-word:nth-child(5){
  top: 58px;
  left: 15px;
  transform: rotate(-345deg);
}
.hero-word:nth-child(6){
  top: 50px;
  transform: rotate(-330deg);
}
.hero-word:nth-child(7){
  top:70px;
  transform: rotate(-330deg);
}
.hero-word:nth-child(8){
  top: 43px;
  transform: rotate(345deg);
}
.hero-word:nth-child(9){
  top: 75px;
  transform: rotate(353deg);
}
.hero-word:nth-child(10){
  top: 65px;
  left: 20px;
  transform: rotate(-355deg);
}
.hero-word:nth-child(11){
  top: 90px;
  left: 40px;
  transform: rotate(355deg);
}
.hero-title{
  width: 80%;
  margin: auto;
  margin-top: 100px;
  text-align: center;
  color: $primary-700;
  font-size: 60px;
  font-weight: 700;
  line-height: 75px;
}
.hero-subtitle{
  width: 80%;
  margin: auto;
  text-align: center;
  color: $primary-600;
  font-size: 20px;
  line-height: 24px;
}
.hero-cards {
  margin-top: 50px;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 15px;
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
.hero-card{
  border-radius: 20px;
}
.card-1 {
  grid-area: card1;
  background-image: url(".././assets/images/adpage-image1.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px ;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
.card-4-content{
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10;
}
.card-4-header{
  display: flex;
  justify-content: space-between;
}
.card-4-subtitle{
  color: $primary-700;
}
.card-4-footer{
  display: flex;
  justify-content: space-between;
}
.card-4-list{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 5px 25px;
  max-height: 70px;
}
.card-4-count{
  display: inline-flex;
  align-items: flex-end;
}
.card-4-count-content{
  background-color: $primary-500;
  color: $neutrals-100;
  padding: 8px 7px;
  border-radius: 8px;
}
.card-5 {
  grid-area: card5;
  background-image: url("../assets/images/adpage-image4.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px ;
  display: flex;
  flex-direction: column;
  gap: 12px;

}
.card-6 {
  grid-area: card6;
  background-color: $primary-100;
  border: 1px solid $primary-500;
  padding: 32px 24px;
}
.card-6-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  height: calc(100% - 32px);
}
.card-6-subtitle{
  color: $primary-500;
  font-size: 20px;
}
.card-7 {
  grid-area: card7;
  background-image: url("../assets/images/adpage-image5.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 12px;
}
.card-7-content{
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 20px;
  border-radius: 16px;
  background-color: $neutrals-100;
  opacity: 0.8;
}
.card-7-word{
  font-size: 16px;
  color: $neutrals-900;
  font-weight: 500;
}
.card-7-more{
  font-size: 14px;
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
.card-1{

}
.card-header{
  display: flex;
  justify-content: space-between;
}
.card-status{
  display: flex;
  align-items: center;
  background-color: $neutrals-100;
  padding: 8px 12px 8px 8px;
  border-radius: 20px;
  gap: 5px;
}
.card-actions{
  display: flex;
  align-items: center;
  background-color: $neutrals-100;
  padding: 4px 8px 4px 8px;
  border-radius: 20px;
}
.card-main{
  background-color: $neutrals-100;
  border:1px solid $neutrals-400;
  opacity: 0.8;
  padding: 20px 0;
  border-radius: 16px;
}
.card-flag{
  margin-left:12px ;
}
.card-content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.part-of-speech{
  position: relative;
  bottom: 18px;
}

.card-tags{
  display: flex;
  gap: 6px;
}
.card-tag{
  background-color: $secondary-300;
  color: $secondary-700;
  border: 1px solid $secondary-400;
  border-radius: 8px;
  padding: 6px 12px;
  margin: 22px 0 0 0;
}
.card-translation{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $neutrals-100;
  border-radius: 16px;
  opacity: 0.8;
  padding: 12px 0;
}
.card-translation-actions{
  display: flex;
  justify-content: space-between;
  width: 80%;
}
.card-translation-navigation{
  cursor: pointer;
  border: none;
  outline: none;
  background-color: inherit;
}
.card-translation-word{
  font-size: 16px;
  line-height: 20px;
}
.card-translation-info{
  font-size: 10px;
  line-height: 12px;
  color: $neutrals-600;
}
.language-card{
  background-repeat: no-repeat;
  background-size: cover;
  padding: 24px 14px;
}
.language-card-content{
  background-color: $neutrals-100;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  padding: 32px;
  opacity: 0.8;
}
.language-card-activities{
  display: flex;
  align-items: center;
  gap: 4px;
}
.language-card-activity{
  display: flex;
  align-items: center;
}
.language-card-title{
  font-size: 20px;
}
.interactive-icon{
  cursor: pointer;
}
.card-4{
  position: relative;
}
.stacked-card{
  position: absolute;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease;
}
.stacked-card-1{
  top: 0;
  left: 0;
  z-index: 3;
  transform: translateX(0px) translateY(0px);
  width: 37rem;
  height: 18rem;
  background-color: $primary-300;
}
.stacked-card-2{
  left: 10px;
  z-index: 2;
  width: 37rem;
  height: 18rem;
  background-color: $primary-300;
  box-shadow: 0 0 8px 0 rgba(17, 17, 26, 0.1), 0 1px 0 0 rgba(17, 17, 26, 0.05);
  background: rgba(92, 119, 210, 0.6);
  transform: rotate(-357deg);
}
.stacked-card-3 {
  left: 20px;
  z-index: 1;
  width: 36.5rem;
  height: 18rem;
  background-color: $primary-300;
  transform: rotate(-355deg);

}

</style>