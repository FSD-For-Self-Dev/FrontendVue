<script lang="ts">
import {defineComponent} from 'vue'
import Icon from "@/components/UI/icon/Icon.vue";
import Button from "@/components/UI/button/Button.vue";

export default defineComponent({
  name: "FriendsMainView",
  components: {Button, Icon},
  data() {
      return{
        friendsCount:5,
      }
  },
})
</script>

<template>
  <button class="friends-main-view">
    <div class="friends-main-view--header">
        <h2 class="friends-main-view--title">

          <Icon name="group-chat" width="32" height="32"/>Друзья
          <span v-show="friendsCount" class="friends-main-view--friends-count">{{friendsCount}}</span>
        </h2>
      <Icon name="arrow-forward-default" width="32" height="32" />
    </div>
    <div class="friends-main-view--content">

      <div class="friends-main-view--empty-list" v-if="friendsCount === 0">
        <span class="friends-main-view--empty-info">Скоро на платформе</span>
      </div>

      <div class="friends-main-view--friends" v-else>
        <div class="friends-main-view--friends-list">
          <span class="friends-main-view--friends-info">Скоро на платформе</span>
        </div>
      </div>
    </div>


  </button>
</template>

<style lang="scss">
  .friends-main-view{
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
  .friends-main-view--header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid $neutrals-400;
    gap: 2rem;
  }
  .friends-main-view--title{
    font-family: 'Inter';
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .friends-main-view--friends-count{
    color: $neutrals-600;
  }
  .friends-main-view--content{
    margin-top: 2rem;
    display: flex;
    align-items: start;
  }
  .friends-main-view--empty-info{
    color: $neutrals-700;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
  .friends-main-view--friends-info{
    color: $neutrals-700;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
</style>