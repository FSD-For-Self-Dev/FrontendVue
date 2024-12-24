<script lang="ts">
import { Slide } from 'vue3-carousel';
export default {
  data() {
    return {
      list: ['Vacaciones', 'Vacation', 'Vacanze', 'Vakantie', 'Ferien', 'Ferie', 'Tatil'],
      more: false
    };
  },
  components: { Slide },
};
</script>

<template>
  <Slide
    ><div :class="$style.wrapper">
      <ul :class="$style.list">
        <li :class="$style.item" v-if="more" v-for="item in list">{{item}}</li>
        <li :class="$style.item" v-else v-for="item in list.slice(0, 2)">{{item}}</li>

        <li v-if="!more" @click="more = true" :class="$style.more">Еще 5</li>
      </ul>
    </div></Slide
  >
</template>

<style lang="scss" module>
.wrapper {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.6rem;
  width: 34.5rem;
  height: 54.5rem;
  background-image: url('../../../assets/images/landing-slide2-1.png');
  border-radius: 2rem;
  background-repeat: no-repeat;
  background-position: 70%;
  background-size: cover;
}

.list {
  background-color: $neutrals-100;
  opacity: 80%;
  padding: 1.6rem 2rem;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 1.6rem;
  gap: 1rem;
}

.item {
  @include subheading-4;
  color: $neutrals-900;
}

.more {
  @include subheading-5;
  color: $neutrals-600;
  cursor: pointer;
  
  &:hover {
    color: $neutrals-800;
  }
}
</style>
