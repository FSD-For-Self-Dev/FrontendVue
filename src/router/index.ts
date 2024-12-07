import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Vocabulary from '@/views/Vocabulary.vue';
import Languages from '@/views/Languages.vue';
import LanguageProfile from '@/views/LanguageProfile.vue';
import Settings from '@/views/Settings.vue';
import Error404 from '@/views/Error404.vue';
// import Test from '@/views/Test.vue';

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
        path: '/languages/:slug',
        name: 'language-profile',
        component: LanguageProfile
    },
    {
        path: '/settings',
        component: Settings,
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Error404,
    },
    // {
    //     path: '/test',
    //     component: Test,
    // },
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
