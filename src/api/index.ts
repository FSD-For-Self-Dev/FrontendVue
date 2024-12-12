/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import type { IApi, Module } from '@/types/api/api-types';
import type { Auth } from '@/types/api/services';
import type { User } from '@/types/api/services';
import type { Languages } from '@/types/api/services';
import type { Vocabulary } from '@/types/api/services/vocabulary-types';

const key = localStorage.getItem('token');

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    ...(key && { headers: { Authorization: `Token ${key}` } })
});


const registerApi = (api: IApi) => {
    const services = import.meta.glob<Module>('./services/*.service.ts', {
        eager: true,
    });

    Object.entries<Module>(services).forEach(([_path, definition]) => {
        definition.default(api);
    });
};

export class Api implements IApi {
    constructor() {
        registerApi(this);
    }

    auth = <Auth>{};
    user = <User>{};
    languages = <Languages>{};
    vocabulary = <Vocabulary>{};
    request = instance;

    updateToken = (key: string) => {
        this.request.defaults.headers['Authorization'] = `Token ${key}`;
    };

    clearToken = () => {
        this.request.defaults.headers['Authorization'] = '';
    };
}

export default new Api();
