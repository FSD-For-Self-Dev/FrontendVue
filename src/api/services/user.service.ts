import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
    api.user = {
        getUser() {
            return api.request.get('/api/auth/user/');
        },
    };
};
