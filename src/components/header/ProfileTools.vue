<template>
    <OnClickOutside @trigger.stop="() => handleClose()">
        <div class="profile-tools">
            <div class="username">{{ username }}</div>
            <button @click="handleExit" class="profile-tools__button">
                <ExitIcon size="24" /> Выйти
            </button>
        </div>
    </OnClickOutside>
</template>

<script lang="ts">
import ExitIcon from '@/assets/icons/actions/ExitIcon.vue';
import { useUserStore } from '@/store/user';
import { OnClickOutside } from '@vueuse/components';
import { mapActions, mapState } from 'pinia';

export default {
    components: {
        OnClickOutside,
        ExitIcon
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

    .username {
        font-family: 'Inter';
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2rem;
        margin-bottom: 1.6rem;
        text-align: right;
    }

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