/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User, Auth, Languages, Vocabulary } from './services';
import type { AxiosInstance } from 'axios';

export interface IApi {
    auth: Auth;
    user: User;
    languages: Languages;
    vocabulary: Vocabulary;
    request: AxiosInstance;
}

export type Module = {
    default: (api: IApi) => any;
};
