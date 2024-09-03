import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Vocabulary from '@/views/Vocabulary.vue';
import Languages from '@/views/Languages.vue';
import NewWord from '@/views/NewWord.vue';
import Error404 from '@/views/Error404.vue';

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
        path: '/new-word',
        component: NewWord,
    },
    {
        path: '/languages',
        component: Languages,
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
