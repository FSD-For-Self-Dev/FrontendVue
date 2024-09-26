import type { IApi } from '@/types/api/api-types';
import type { LoginDto, RegistrationDto } from '@/dto/auth.dto';

export default (api: IApi) => {
    api.auth = {
        login(data: LoginDto) {
            // return api.request.post('/api/auth/login/', data);
            return api.request.post('https://linguista.onrender.com/api/auth/login/', data);
        },
        logout() {
            console.log('logout');
        },
        registration(data: RegistrationDto) {
            return api.request.post('/api/auth/registration/', data);
        },
    };
};
