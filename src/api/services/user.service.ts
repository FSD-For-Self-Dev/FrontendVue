import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
  api.user = {
    getUser(locale?: string) {
      if (locale) {
        return api.request.get(`/${locale}/api/auth/user/`);
      }
      return api.request.get('/api/auth/user/');
    },
    patchUser(data, locale?: string) {
      if (locale) {
        return api.request.patch(`/${locale}/api/auth/user/`, data);
      }
      return api.request.patch('/api/auth/user/', data);
    },
    deleteUser() {
      return api.request.delete('/api/auth/user/');
    },
  };
};
