import api from '@/api';
import { defineStore } from 'pinia';

//Тип не полностью взят с swagger, только самое нужное
export interface IUserState {
    authStatus: boolean;
    id: string;
    username: string;
    image: string;
}

export const useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            authStatus: false,
            id: '',
            username: '',
            image: '',
        };
    },
    actions: {
        async getUser() {
            const res = await api.user.getUser();
            console.log(res);
            try {
                this.authStatus = true;
                this.id = res.data.id;
                this.username = res.data.username;
                this.image = res.data.image;
            } catch (e) {
                this.authStatus = false;
            }
        },
    },
});
