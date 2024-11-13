<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import type { PropType } from 'vue';
import Input from '@/components/UI/input/Input.vue';
import Button from '@/components/UI/button/Button.vue';
import CloseIcon from '@/assets/icons/actions/CloseIcon.vue';
import { mapActions, mapWritableState } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { isAxiosError } from 'axios';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { useInfoMessagesStore } from '@/store/info-message';

export default {
  components: { OnClickOutside, Input, Button, CloseIcon },
  computed: {
    ...mapWritableState(useAuthStore, ['email', 'password', 'password1', 'password2', 'username', 'remember', 'errors']),
  },
  props: {
    showAuth: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    closeAuth: {
      type: Function as PropType<() => void>,
      required: true,
    },
    viewAuth: {
      type: String as PropType<'login' | 'register'>,
      required: true,
    },
    switchForm: {
      type: Function as PropType<(form: 'login' | 'register') => void>,
      required: true,
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login', 'registration', 'clearState']),
    ...mapActions(useUserStore, ['getUser']),
    ...mapActions(useLanguagesStore, ['getAvailableLanguages', 'getLearningLanguages']),
    ...mapActions(useVocabularyStore, ['getVocabulary']),
    ...mapActions(useInfoMessagesStore, ['addNewMessage']),
    switchFormHandler(form: 'login' | 'register') {
      this.clearState();
      this.switchForm(form);
    },
    closeFormHandler() {
      this.clearState();
      this.closeAuth();
    },
    async registrationSubmitHandler() {
      await this.registration().then(res => {
        if (!isAxiosError(res)) {
          this.password = this.password1;
          this.loginSubmitHandler();
        } else {
          this.addNewMessage({ type: 'error', text: res.response?.data['non_field_errors'][0] });
        }
      });
    },
    async loginSubmitHandler() {
      await this.login().then(res => {
        if (!isAxiosError(res)) {
          Promise.all([
            this.getUser(),
            this.getAvailableLanguages(),
            this.getLearningLanguages(),
            this.getVocabulary()
          ]);
          this.closeFormHandler();
        } else {
          this.addNewMessage({ type: 'error', text: res.response?.data['non_field_errors'][0] });
        }
      });
    },
  }
};
</script>

<template>
  <Teleport to="body">
    <OnClickOutside :options="{ ignore: ['#info-messages'] }" @trigger="closeFormHandler">
      <div class="modal-auth" v-if="showAuth">
        <form @submit.prevent="loginSubmitHandler" class="modal-auth--form" v-if="viewAuth === 'login'">
          <h2 class="modal-auth--title">Рады видеть вас снова!</h2>
          <Input 
            type="text" 
            label="Логин" 
            :show-label="true" 
            v-model="username"
            :server-error="errors.username ? errors.username.toString() : undefined" 
          />
          <Input 
            type="password" 
            label="Пароль" 
            :show-label="true" 
            v-model="password"
            :server-error="errors.password ? errors.password.toString() : undefined" 
          />
          <div class="modal-auth--tools">
            <div>
              <input class="custom-checkbox" type="checkbox" id="remember" v-model="remember" />
              <label class="custom-label" for="remember">Запомнить меня</label>
            </div>
            <a class="modal-auth--link">Забыли пароль?</a>
          </div>
          <Button 
            style="width: 100%; display: flex; justify-content: center" 
            variant="primary" 
            size="medium"
            view="icon"
          >
            Войти
          </Button>
          <div>
            Нет аккаунта? 
            <a class="modal-auth--link" @click="() => switchFormHandler('register')">Зарегистрироваться</a>
          </div>
        </form>

        <form @submit.prevent="registrationSubmitHandler" class="modal-auth--form" v-if="viewAuth === 'register'">
          <h2 class="modal-auth--title">Добро пожаловать!</h2>
          <Input 
            type="text" 
            label="Логин" 
            :show-label="true" 
            v-model="username"
            :server-error="errors.username ? errors.username.toString() : undefined" 
          />
          <Input 
            type="email" 
            label="Email" 
            :show-label="true" 
            v-model="email"
            :server-error="errors.email ? errors.email.toString() : undefined" 
          />
          <Input 
            type="password" 
            label="Пароль" 
            :show-label="true" 
            v-model="password1"
            :server-error="errors.password1 ? errors.password1.toString() : undefined" 
          />
          <Input 
            type="password" 
            label="Подтверждение пароля" 
            :show-label="true" 
            v-model="password2"
            :server-error="errors.password2 ? errors.password2.toString() : undefined" 
          />
          <Button 
            style="width: 100%; display: flex; justify-content: center" 
            variant="primary" 
            size="medium"
            view="icon"
          >
            Создать аккаунт
          </Button>
          <div>
            Уже есть аккаунт? 
            <a class="modal-auth--link" @click="() => switchFormHandler('login')">Войти</a>
          </div>
        </form>

        <div class="modal-auth--image" />
        <button class="modal-auth--close" @click="closeFormHandler">
          <CloseIcon size="24" />
        </button>
      </div>
    </OnClickOutside>
  </Teleport>
</template>

<style lang="scss">
.authentication {
  display: flex;
  gap: 1rem;
}

.modal-auth {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 88rem;
  height: 62rem;
  background-color: $neutrals-100;
  box-shadow: $regular-shadow;
  border-radius: $radius-md;
  display: flex;
  justify-content: space-between;

  .modal-auth--image {
    background-image: url("../../assets/images/modal-auth-image.jpg");
    background-size: cover;
    min-width: 44rem;
    height: 62rem;
    border-radius: 0 $radius-md $radius-md 0;
  }

  .modal-auth--title {
    font-family: 'Inter';
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
    align-self: start;
    margin-bottom: 1.2rem;
  }

  .modal-auth--close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 4.4rem;
    height: 4.4rem;
    background-color: transparent;
    border: none;
    color: $neutrals-600;
    cursor: pointer;
    background-color: $neutrals-100;
    border-radius: $radius-full;
    box-shadow: $regular-shadow;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-auth--form {
    gap: 1.2rem;
    padding: 4.8rem 4.8rem 0;
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .modal-auth--tools {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .modal-auth--link {
    color: $primary-500;
    font-family: 'Inter';
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.6rem;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked+.custom-label::before {
    border-color: $primary-500;
    background-color: $primary-500;
    background-image: url("../../assets/icons/tick.svg");
  }
}

.custom-label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-family: 'Inter';
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.6rem;

  &::before {
    content: '';
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    flex-grow: 0;
    border: 0.1rem solid $neutrals-400;
    border-radius: 0.6rem;
    margin-right: 0.5rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 1.6rem 1.6rem;
  }
}
</style>