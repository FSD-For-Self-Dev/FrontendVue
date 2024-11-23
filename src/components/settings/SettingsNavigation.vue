<script lang="ts">
import DeleteIcon from '@/assets/icons/actions/DeleteIcon.vue';
import ExitIcon from '@/assets/icons/actions/ExitIcon.vue';
import ProfileIcon from '@/assets/icons/common/ProfileIcon.vue';

export default {
  components: { DeleteIcon, ExitIcon, ProfileIcon },
};

</script>

<template>
  <nav>
    <ul class="settings--navigation">
      <li class="settings--navigation-item">
        <ProfileIcon size="24" /> Профиль
      </li>
      <li class="settings--navigation-item">
        <ExitIcon size="24" /> Выйти из аккаунта
      </li>
      <li style="color: #CA2744" class="settings--navigation-item">
        <DeleteIcon size="20" /> Удалить аккаунт
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.settings--navigation {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .settings--navigation-item {
    display: flex;
    align-items: center;
    gap: .8rem;

    border: .1rem solid $neutrals-400;
    padding: 1.4rem 2.8rem;
    border-radius: 2.8rem;

    font-family: 'Inter';
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2rem;
  }
}
</style>
