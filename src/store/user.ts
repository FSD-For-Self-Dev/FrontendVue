import api from '@/api';
import type { UserDto } from '@/dto/user.dto';
import { defineStore } from 'pinia';

export interface IUserState {
    token: string;
    authStatus: boolean;
    id: string;
    username: string;
    image: string;
    native_languages: string[];
    first_name: string;
}

export const useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            token: '',
            authStatus: false,
            id: '',
            username: '',
            image: '',
            native_languages: [],
            first_name: '',
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
                this.native_languages = data.native_languages as unknown as string[];
                this.first_name = data.first_name;
            } catch (e) {
                this.authStatus = false;
            }
        },
        async patchUser(data: UserDto) {
            try {
                const res = await api.user.patchUser(data);
                this.authStatus = true;
                this.id = res.data.id;
                this.username = res.data.username;
                this.image = res.data.image;
                this.native_languages = res.data.native_languages as unknown as string[];
                this.first_name = res.data.first_name;
            } catch (e) {
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
