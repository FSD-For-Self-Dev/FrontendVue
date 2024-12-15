import type { IApi } from '@/types/api/api-types';
import type { LoginDto, RegistrationDto } from '@/dto/auth.dto';

export default (api: IApi) => {
  api.auth = {
    login(data: LoginDto, locale?: string) {
      api.clearToken();
      if (locale) {
        return api.request.post(`/${locale}/api/auth/login/`, data);
      }
      return api.request.post('/api/auth/login/', data);
    },
    logout() {
      return api.request.post('/api/auth/logout/');
    },
    registration(data: RegistrationDto, locale?: string) {
      if (locale) {
        return api.request.post(`/${locale}/api/auth/registration/`, data);
      }
      return api.request.post('/api/auth/registration/', data);
    },
  };
};
