<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import { ref, type PropType } from 'vue';
import Input from '@/components/UI/input/Input.vue';
import Button from '@/components/UI/button/Button.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { isAxiosError } from 'axios';
import { useNotificationsStore } from '@//store/notifications';
import IconButton from '../UI/button/IconButton.vue';
import BooleanInput from '../UI/input/BooleanInput.vue';
import { useGlobalActionsStore } from '@/store/global-actions';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll({ behavior: 'smooth' });

export default {
  components: { OnClickOutside, Input, Button, IconButton, BooleanInput },
  emits: ["loginProcceed"],
  setup() {
    const { rememberMe } = useAuthStore();
    const rememberMeCheck = ref(rememberMe);
    return {
      rememberMeCheck,
    }
  },
  mounted() {
    y.value = 0;
  },
  computed: {
    ...mapWritableState(useAuthStore, [
      'email',
      'password',
      'password1',
      'password2',
      'username',
      'rememberMe',
      'errors',
      'authForm',
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ['login', 'registration', 'clearState']),
    ...mapActions(useUserStore, ['getUser']),
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapActions(useGlobalActionsStore, ['update_locale']),
    switchFormHandler(form: 'login' | 'signup') {
      this.clearState();
      this.authForm = form;
    },
    closeFormHandler() {
      this.clearState();
    },
    async signupSubmitHandler() {
      const res = await this.registration();
      if (!isAxiosError(res)) {
        this.password = this.password1;
        this.loginSubmitHandler();
      } else {
        this.addNewMessage({
          type: 'error',
          text: res.response?.data['non_field_errors'][0],
        });
      };
    },
    async loginSubmitHandler() {
      this.rememberMe = this.rememberMeCheck;
      const res = await this.login();
      if (!isAxiosError(res)) {
        await this.getUser();
        const { interface_language } = useUserStore();
        this.$i18n.locale = interface_language;
        this.update_locale(this.$i18n.locale);
        this.$emit('loginProcceed');
        this.closeFormHandler();
      } else {
        this.addNewMessage({
          type: 'error',
          text: res.response?.data['non_field_errors'][0],
        });
      };
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <div class="overlay"></div>

    <OnClickOutside
      :options="{ ignore: ['#notifications'] }"
      @trigger="closeFormHandler"
    >
      <div class="modal-auth">
        <form
          @submit.prevent="loginSubmitHandler"
          class="modal-auth--form"
          v-if="authForm === 'login'"
        >
          <h2 class="modal-auth--title">{{ $t('auth.welcomeAgain') }}</h2>
          <div class="modal-auth--form--inputs">
            <Input
              type="text"
              :label="$t('auth.username')"
              :show-label="true"
              v-model="username"
              :server-error="errors.username ? errors.username.toString() : undefined"
            />
            <Input
              type="password"
              :label="$t('auth.password')"
              :show-label="true"
              v-model="password"
              :server-error="errors.password ? errors.password.toString() : undefined"
            />
          </div>
          <div class="modal-auth--form--actions">
            <div class="modal-auth--tools">
              <BooleanInput
                :label="$t('auth.rememberMe')"
                type="checkbox"
                size="small"
                v-model="rememberMeCheck"
                checked
              />
              <a class="modal-auth--link">{{ $t('auth.forgotPassword') }}</a>
            </div>
            <Button
              :text="$t('auth.logIn')"
              style="width: 100%; display: flex; justify-content: center"
              variant="primary"
              size="medium"
            />
            <div class="auth-switcher">
              {{ $t('auth.noAccount') }}
              <a class="modal-auth--link" @click="() => switchFormHandler('signup')">
                {{ $t('auth.signUp') }}
              </a>
            </div>
          </div>
        </form>

        <form
          @submit.prevent="signupSubmitHandler"
          class="modal-auth--form"
          v-if="authForm === 'signup'"
        >
          <h2 class="modal-auth--title">{{ $t('auth.welcome') }}</h2>
          <div class="modal-auth--form--inputs">
            <Input
              type="text"
              :label="$t('auth.username')"
              :show-label="true"
              v-model="username"
              :server-error="errors.username ? errors.username.toString() : undefined"
            />
            <Input
              type="email"
              :label="$t('auth.email')"
              :show-label="true"
              v-model="email"
              :server-error="errors.email ? errors.email.toString() : undefined"
            />
            <Input
              type="password"
              :label="$t('auth.password')"
              :show-label="true"
              v-model="password1"
              :server-error="errors.password1 ? errors.password1.toString() : undefined"
            />
            <Input
              type="password"
              :label="$t('auth.passwordConfirm')"
              :show-label="true"
              v-model="password2"
              :server-error="errors.password2 ? errors.password2.toString() : undefined"
            />
          </div>
          <div class="modal-auth--form--actions">
            <Button
              :text="$t('auth.signUpConfirm')"
              style="width: 100%; display: flex; justify-content: center"
              variant="primary"
              size="medium"
            />
            <div class="auth-switcher">
              {{ $t('auth.alreadyHaveAccount') }}
              <a class="modal-auth--link" @click="() => switchFormHandler('login')">
                {{ $t('auth.logIn') }}
              </a>
            </div>
          </div>
        </form>

        <div class="modal-auth--image" />
        <IconButton
          icon="CloseIcon"
          size="md"
          variant="shadowed"
          class="modal-auth--close"
          @click="closeFormHandler"
        />
      </div>
    </OnClickOutside>
  </Teleport>
</template>

<style lang="scss">
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: $neutrals-600;
  opacity: 30%;
  top: 0;
  left: 0;
  z-index: 20000;
}

.modal-auth {
  position: absolute;
  top: 6.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 25000;
  width: 88rem;
  height: 62rem;
  background-color: $neutrals-100;
  box-shadow: $regular-shadow;
  border-radius: $radius-lg;
  display: flex;
  justify-content: space-between;

  .modal-auth--image {
    background-image: url('../../assets/images/modal-auth-image.jpg');
    background-size: cover;
    min-width: 44rem;
    height: 62rem;
    border-radius: 0 $radius-lg $radius-lg 0;
  }

  .modal-auth--title {
    @include heading-4;
    align-self: start;
    margin-bottom: 3.2rem;
    width: 100%;
  }

  .modal-auth--close {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }

  .modal-auth--form {
    display: flex;
    flex-direction: column;
    padding: 4.8rem 4.8rem 0;
    width: 100%;

    &--inputs {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
    }

    &--actions {
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      margin-top: 2.4rem;
    }
  }

  .modal-auth--tools {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .auth-switcher {
    @include text-3;
    color: $neutrals-900;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.4rem;
  }

  .modal-auth--link {
    @include text-3;
    color: $primary-500;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
