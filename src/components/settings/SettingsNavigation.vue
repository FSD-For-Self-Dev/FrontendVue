<script lang="ts">
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import ProfileIcon from '@/components/icons/ProfileIcon.vue';

export default {
  components: { DeleteIcon, ExitIcon, ProfileIcon, Button },
};

</script>

<template>
  <nav class="settings--navigation">
    <ul class="settings--list">
      <li>
        <Button :style="{ width: '100%' }" size="medium" variant="secondary" text="Профиль" content-type="left-icon">
          <ProfileIcon size="24" />
        </Button>
      </li>
      <li>
        <Button :style="{ width: '100%' }" size="medium" variant="secondary" text="Выйти из аккаунта"
          content-type="left-icon">
          <ExitIcon size="24" />
        </Button>
      </li>
      <li>
        <Button :style="{ width: '100%', color: '#CA2744' }" size="medium" variant="secondary" text="Удалить аккаунт"
          content-type="left-icon">
          <DeleteIcon size="20" />
        </Button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.settings--navigation {
  position: fixed;
  top: 20rem;

  .settings--list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

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
