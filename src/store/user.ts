import api from '@/api';
import { defineStore } from 'pinia';

//Тип не полностью взят с swagger, только самое нужное
export interface IUserState {
    token: string;
    authStatus: boolean;
    id: string;
    username: string;
    image: string;
}

export const useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            token: '',
            authStatus: false,
            id: '',
            username: '',
            image: '',
        };
    },
    actions: {
        async getUser() {
            try {
                const { data } = await api.user.getUser();
                this.authStatus = true;
                this.id = data.id;
                this.username = data.username;
                this.image = data.image;
            } catch (e) {
                this.authStatus = false;
            }
        },
        logout() {
            this.authStatus = false;
            this.id = '';
            this.username = '';
            this.image = '';
            this.token = '';
            localStorage.removeItem('key');
        }
    },
});
