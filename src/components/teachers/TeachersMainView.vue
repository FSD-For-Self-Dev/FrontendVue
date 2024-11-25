<script lang="ts">
import {defineComponent} from 'vue'
import Button from "@/components/UI/button/Button.vue";
import ExercisesIcon from '@/components/icons/ExercisesIcon.vue';
import LineArrowForwardIcon from '@/components/icons/LineArrowForwardIcon.vue';

export default defineComponent({
  name: "teachersMainView",
  components: {Button, ExercisesIcon, LineArrowForwardIcon},
  data() {
    return{
      teachersCount:5,
    }
  },
})
</script>

<template>
  <button class="teachers-main-view">
    <div class="teachers-main-view--header">
      <h2 class="teachers-main-view--title">

        <ExercisesIcon size="32"/>Преподаватели
        <span v-show="teachersCount" class="teachers-main-view--teachers-count">{{teachersCount}}</span>
      </h2>
      <LineArrowForwardIcon size="32"/>
    </div>
    <div class="teachers-main-view--content">

      <div class="teachers-main-view--empty-list" v-if="teachersCount === 0">
        <span class="teachers-main-view--empty-info">Скоро на платформе</span>
      </div>

      <div class="teachers-main-view--teachers" v-else>
        <div class="teachers-main-view--teachers-list">
          <span class="teachers-main-view--teachers-info">Скоро на платформе</span>
        </div>
      </div>
    </div>


  </button>
</template>

<style lang="scss">
.teachers-main-view{
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

}
.teachers-main-view--header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 0.1rem solid $neutrals-400;
}
.teachers-main-view--title{
  font-family: 'Inter';
  font-size: 2rem;
  line-height: 2.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.teachers-main-view--teachers-count{
  color: $neutrals-600;
}
.teachers-main-view--content{
  margin-top: 2rem;
  display: flex;
  align-items: start;
}
.teachers-main-view--empty-info{
  color: $neutrals-700;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.8rem;
}
.teachers-main-view--teachers-info{
  color: $neutrals-700;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.8rem;
}
</style>