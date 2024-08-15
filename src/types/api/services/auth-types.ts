import type { LoginDto, RegistrationDto } from '@/dto/auth.dto';
import type { AxiosPromise } from 'axios';

export type Auth = {
    login: (data: LoginDto) => AxiosPromise<Record<string, string>>;
    logout: () => void;
    registration: (data: RegistrationDto) => void;
};
