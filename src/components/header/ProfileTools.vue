<template>
    <OnClickOutside @trigger.stop="() => handleClose()">
        <div class="profile-tools">
            <button @click="handleExit" class="profile-tools__button">
                <ExitIcon size="24" /> Выйти
            </button>
        </div>
    </OnClickOutside>
</template>

<script lang="ts">
import ExitIcon from '@/assets/icons/ExitIcon.vue';
import Icon from '@/components/UI/icon/Icon.vue';
import { useUserStore } from '@/store/user';
import { OnClickOutside } from '@vueuse/components';
import { mapActions } from 'pinia';

export default {
    components: {
        Icon,
        OnClickOutside,
        ExitIcon
    },
    props: {
        handleClose: {
            type: Function,
            required: true
        }
    },
    methods: {
        ...mapActions(useUserStore, ["logout"]),
        handleExit() {
            this.logout();
            this.handleClose();
        }
    }
}
</script>


<style lang="scss">
.profile-tools {
    position: fixed;
    top: 11rem;
    right: 2rem;
    padding: 1.2rem 1.6rem;
    box-shadow: $regular-shadow;
    background-color: $neutrals-100;
    min-width: 30.2rem;
    border-radius: 2rem;

    .profile-tools__button {
        background-color: transparent;
        border: none;
        font-family: Inter;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2rem;
        display: flex;
        align-items: center;
        gap: 1.2rem;
        cursor: pointer;
    }
}
</style>