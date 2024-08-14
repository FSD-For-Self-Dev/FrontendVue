import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
    api.auth = {
        async login(username, password) {
            const res = await api.request('/api/auth/login/', {
                method: 'POST',
                data: {
                    username,
                    password,
                },
            });

            return await res.data;
        },
        logout() {
            console.log('logout');
        },
        async registration(username, email, password1, password2) {
            await api.request('/api/auth/registration/', {
                method: 'POST',
                data: {
                    username,
                    email,
                    password1,
                    password2,
                },
            });
        },
    };
};
