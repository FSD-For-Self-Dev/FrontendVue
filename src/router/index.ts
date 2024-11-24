import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Vocabulary from '@/views/Vocabulary.vue';
import Languages from '@/views/Languages.vue';
import Error404 from '@/views/Error404.vue';
import Test from '@/views/Test.vue';
import Settings from '@/views/Settings.vue';

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/vocabulary',
        component: Vocabulary,
    },
    {
        path: '/languages',
        component: Languages,
    },
    {
        path: '/test',
        component: Test,
    },
    {
        path: '/settings',
        component: Settings,
    },
    {
        path: '/:catchAll(.*)',
        component: Error404,
    }
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
