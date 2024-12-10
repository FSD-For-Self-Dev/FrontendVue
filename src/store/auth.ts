import api from '@/api';
import { AxiosError, isAxiosError } from 'axios';
import { defineStore } from 'pinia';

export type authFormErrors = {
  username: string[];
  email: string[];
  password: string[];
  password1: string[];
  password2: string[];
};

export interface IAuthState {
  email: string;
  username: string;
  password: string;
  password1: string;
  password2: string;
  rememberMe: boolean;
  errors: authFormErrors;
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => {
    return {
      email: '',
      username: '',
      password: '',
      password1: '',
      password2: '',
      rememberMe: true,
      errors: {
        username: [],
        email: [],
        password: [],
        password1: [],
        password2: [],
      },
    };
  },
  actions: {
    async login(locale?: string) {
      try {
        const res = await api.auth.login(
          {
            username: this.username,
            password: this.password,
          },
          locale,
        );
        if (this.rememberMe) {
          localStorage.setItem('token', res.data.key);
        }        
        api.updateToken(res.data.key);
        return res;
      } catch (error) {
        if (isAxiosError(error)) {
          this.errors = error.response?.data;
          return error;
        }
      }
    },
    async registration(locale?: string) {
      try {
        const res = await api.auth.registration(
          {
            username: this.username,
            email: this.email,
            password1: this.password1,
            password2: this.password2,
          },
          locale,
        );
        return res;
      } catch (error) {
        if (isAxiosError(error)) {
          this.errors = error.response?.data;
        }
        return error;
      }
    },
    clearState() {
      this.email = '';
      this.username = '';
      this.password = '';
      this.password1 = '';
      this.password2 = '';
      this.rememberMe = false;
      this.errors = {
        username: [],
        email: [],
        password: [],
        password1: [],
        password2: [],
      };
    },
  },
});
