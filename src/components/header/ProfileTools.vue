<script lang="ts">
import { useUserStore } from '@/store/user';
import { OnClickOutside } from '@vueuse/components';
import { mapActions, mapState } from 'pinia';

export default {
    components: {
        OnClickOutside,
    },
    props: {
        handleClose: {
            type: Function,
            required: true
        }
    },
    computed: {
        ...mapState(useUserStore, ["username"])
    },
    methods: {
        ...mapActions(useUserStore, ["logout"]),
        handleExit() {
            this.logout();
            this.handleClose();
        },
        handleSettings() {
            this.$router.push("/settings");
            this.handleClose();
        }
    }
}
</script>

<template>
    <OnClickOutside @trigger.stop="() => handleClose()">
        <div class="profile-tools">
            <button @click="handleSettings" class="profile-tools__button">
                <svg-icon name="SettingsIcon" size="md" />Настройки
            </button>
            <button @click="handleExit" class="profile-tools__button">
                <svg-icon name="ExitIcon" size="md" />Выйти
            </button>
        </div>
    </OnClickOutside>
</template>

<style lang="scss">
.profile-tools {
    position: fixed;
    top: 11rem;
    right: 2rem;
    box-shadow: $regular-shadow;
    background-color: $neutrals-100;
    min-width: 30.2rem;
    border-radius: 2rem;

    .profile-tools__button {
        @include text-2;
        background-color: transparent;
        border: none;
        display: flex;
        align-items: center;
        gap: 1.2rem;
        cursor: pointer;
        width: 100%;
        padding: 1.6rem 2rem;

        &:nth-child(1) {
            border-radius: 2rem 2rem 0 0;
        }
        &:last-child {
            border-radius: 0 0 2rem 2rem;
        }

        &:hover {
            background-color: $neutrals-300;
        }

        &:active {
            background-color: $neutrals-200;
        }
    }
}
</style>
