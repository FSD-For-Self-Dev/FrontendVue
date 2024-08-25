/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User, Auth, Languages } from './services';
import type { AxiosInstance } from 'axios';

export interface IApi {
    auth: Auth;
    user: User;
    languages: Languages;
    request: AxiosInstance;
}

export type Module = {
    default: (api: IApi) => any;
};
