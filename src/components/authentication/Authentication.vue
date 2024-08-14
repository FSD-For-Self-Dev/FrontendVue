<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import type { PropType } from 'vue';
import Input from '@/components/UI/input/Input.vue';
import Button from '@/components/UI/button/Button.vue';
import api from "@/api"

export default {
  name: "Authentication",
  components: { OnClickOutside, Input, Button },
  data() {
    return {
      username: "",
      password: "",
      password1: "",
      password2: "",
      email: "",
      remember: false
    };
  },
  props: {
    showAuth: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    closeAuth: {
      type: Function,
      required: true,
    },
    viewAuth: {
      type: String as PropType<'login' | 'register'>,
      required: true,
    },
    switchForm: {
      type: Function,
      required: true,
    }
  },
  methods: {
    async authorization(event: Event) {
      event.preventDefault();
      const data = await api.auth.login(this.username, this.password);
      localStorage.setItem('token', data.key);
      // TODO: Обработчики ошибок
    },
    async registration(event: Event) {
      event.preventDefault();
      await api.auth.registration(this.username, this.email, this.password1, this.password2);
      // TODO: Обработчики ошибок
    },
    switchFormHandler(form: 'login' | 'register') {
      this.email = '';
      this.password = '';
      this.password1 = '';
      this.password2 = '';
      this.username = '';
      this.switchForm(form);
    }
  }
}
</script>

<template>
  <OnClickOutside @trigger="() => closeAuth()">
    <div class="modal-auth" v-if="showAuth">
      <form @submit="authorization" class="modal-auth--form" v-if="viewAuth === 'login'">
        <h2 class="modal-auth--title">Рады видеть вас снова!</h2>

        <Input type="text" label="Логин" :show-label="true" v-model="username" />
        <Input type="password" label="Пароль" :show-label="true" v-model="password" />

        <div class="modal-auth--tools">
          <div>
            <input class="custom-checkbox" type="checkbox" id="remember" v-model="remember" />
            <label class="custom-label" for="remember">

              Запомнить меня
            </label>
          </div>

          <a class="modal-auth--link">Забыли пароль?</a>
        </div>

        <Button style="width: 100%; display: flex; justify-content: center" variant="primary" size="medium"
          view="icon">Войти</Button>

        <div>Нет аккаунта? <a class="modal-auth--link" @click="() => switchFormHandler('register')">Зарегистрироваться</a>
        </div>
      </form>

      <form @submit="registration" class="modal-auth--form" v-if="viewAuth === 'register'">
        <h2 class="modal-auth--title">Добро пожаловать!</h2>

        <Input type="text" label="Логин" :show-label="true" v-model="username" />
        <Input type="email" label="Email" :show-label="true" v-model="email" />
        <Input type="password" label="Пароль" :show-label="true" v-model="password1" />
        <Input type="password" label="Пароль" :show-label="true" v-model="password2" />



        <Button style="width: 100%; display: flex; justify-content: center" variant="primary" size="medium"
          view="icon">Создать аккаунт</Button>

        <div>Уже есть аккаунт? <a class="modal-auth--link" @click="() => switchFormHandler('login')">Войти</a>
        </div>
      </form>

      <div class="modal-auth--image" />

      <button class="modal-auth--close" @click="() => closeAuth()" />
    </div>
  </OnClickOutside>
</template>

<style lang="scss">
.authentication {
  display: flex;
  gap: 1rem;
}

.modal-auth {
  position: fixed;
  top: 140%;
  left: 25%;
  width: 880px;
  height: 620px;
  background-color: $neutrals-100;
  box-shadow: $regular-shadow;
  border-radius: $radius-md;
  display: flex;
  justify-content: space-between;

  .modal-auth--image {
    background-image: url("../../assets/images/modal-auth-image.jpg");
    background-size: cover;
    width: 440px;
    height: 620px;
    border-radius: 0 $radius-md $radius-md 0;
  }

  .modal-auth--title {
    font-family: 'Inter';
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    align-self: start;
    margin-bottom: 12px;
  }

  .modal-auth--close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    background-color: transparent;
    border: none;
    font-size: 1.6rem;
    font-weight: 700;
    color: $neutrals-600;
    cursor: pointer;
    background-color: $neutrals-100;
    border-radius: $radius-full;
    background-image: url("../../assets/icons/close.svg");
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: $regular-shadow;
  }

  .modal-auth--form {
    gap: 12px;
    padding: 48px 48px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    border-radius: 6px;
    margin-right: 0.5rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 16px 16px;
  }
}
</style>