import { app } from './main-app';
import type { App } from 'vue';
import api from '@/api';

class ApiPlugin {
    install(app: App) {
        app.config.globalProperties.$api = api;
    }
}

app.use(new ApiPlugin());
