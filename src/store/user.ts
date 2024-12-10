import api from '@/api';
import type { UserDto } from '@/dto/user.dto';
import { defineStore } from 'pinia';

export interface IUserState {
  authStatus: boolean;
  id: string;
  username: string;
  image: string;
  native_languages: string[];
  first_name: string;
  interface_language: string;
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => {
    return {
      id: '',
      username: '',
      image: '',
      native_languages: [],
      first_name: '',
      interface_language: '',
      authStatus: Boolean(localStorage.getItem('token')),
    };
  },
  actions: {
    async getUser(locale?: string) {
      try {
        const { data } = await api.user.getUser(locale);
        if (data) {
          this.id = data.id;
          this.username = data.username;
          this.image = data.image;
          this.native_languages = data.native_languages as unknown as string[];
          this.first_name = data.first_name;
          this.interface_language = data.interface_language;
        };
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async patchUser(data: UserDto) {
      try {
        const res = await api.user.patchUser(data);
        this.id = res.data.id;
        this.username = res.data.username;
        this.image = res.data.image;
        this.native_languages = res.data.native_languages as unknown as string[];
        this.first_name = res.data.first_name;
        this.interface_language = res.data.interface_language;
      } catch (e) {}
    },
    async deleteUser() {
      try {
        await api.user.deleteUser();
        this.id = '';
        this.username = '';
        this.image = '';
        localStorage.removeItem('token');
        this.authStatus = false;
      } catch (e) {
        console.log(e);
      }
    },
    logout() {
      this.id = '';
      this.username = '';
      this.image = '';
      api.clearToken();
      localStorage.removeItem('token');
      this.authStatus = false;
    },
  },
});
