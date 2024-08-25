/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import type { IApi, Module } from '@/types/api/api-types';
import type { Auth } from '@/types/api/services';
import type { User } from '@/types/api/services';
import type { Languages } from '@/types/api/services';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
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
    request = instance;
}

export default new Api();
