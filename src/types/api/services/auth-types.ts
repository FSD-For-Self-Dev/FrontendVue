import type { LoginDto, RegistrationDto } from '@/dto/auth.dto';
import type { AxiosPromise } from 'axios';

export type Auth = {
    login: (data: LoginDto, locale?: string) => AxiosPromise<Record<string, string>>;
    logout: () => void;
    registration: (data: RegistrationDto, locale?: string) => AxiosPromise<Record<string, string>>;
};
