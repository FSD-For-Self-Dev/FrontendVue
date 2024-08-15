import api from '@/api';
import { defineStore } from 'pinia';

export interface IAuthState {
    email: string;
    username: string;
    password: string;
    password1: string;
    password2: string;
    remember: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): IAuthState => {
        return {
            email: '',
            username: '',
            password: '',
            password1: '',
            password2: '',
            remember: false,
        };
    },
    actions: {
        async login() {
            const res = await api.auth.login({
                username: this.username,
                password: this.password,
            });
            localStorage.setItem('key', res.data.key);
        },
        async registration() {
            await api.auth.registration({
                username: this.username,
                email: this.email,
                password1: this.password1,
                password2: this.password2,
            });
        },
        clearState() {
            this.email = '';
            this.username = '';
            this.password = '';
            this.password1 = '';
            this.password2 = '';
            this.remember = false;
        },
    },
});
