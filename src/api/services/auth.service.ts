import type { IApi } from '@/types/api/api-types';
import type { LoginDto, RegistrationDto } from '@/dto/auth.dto';

export default (api: IApi) => {
    api.auth = {
        login(data: LoginDto) {
            return api.request.post('/api/auth/login/', data);
        },
        logout() {
            console.log('logout');
            return api.request.post('/api/auth/logout/');
        },
        registration(data: RegistrationDto) {
            return api.request.post('/api/auth/registration/', data);
        },
    };
};
