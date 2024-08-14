import type { LoginDto, RegistrationDto } from '@/dto/auth.dto';

export type Auth = {
    login: (data: LoginDto) => Promise<{ data: { key: string } }>;
    logout: () => void;
    registration: (data: RegistrationDto) => void;
};
