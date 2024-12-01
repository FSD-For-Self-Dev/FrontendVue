import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
  api.user = {
    getUser() {
      return api.request.get('/api/auth/user/');
    },
    patchUser(data) {
      return api.request.patch('/api/auth/user/', data);
    },
    deleteUser() {
      return api.request.delete('/api/auth/user/');
    },
  };
};
