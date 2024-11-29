<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
export default {
  components: { Button },
};

</script>

<template>
  <nav class="settings--navigation">
    <ul class="settings--list">
      <li>
        <Button :style="{ width: '100%', justifyContent: 'start' }" size="medium" variant="secondary" text="Профиль"
          icon="ProfileIcon" />
      </li>
      <li>
        <Button :style="{ width: '100%', justifyContent: 'start' }" size="medium" variant="secondary"
          text="Выйти из аккаунта" icon="ExitIcon" />
      </li>
      <li>
        <Button :style="{ width: '100%', justifyContent: 'start' }" size="medium" variant="danger"
          text="Удалить аккаунт" icon="DeleteIcon" />
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
}
</style>
