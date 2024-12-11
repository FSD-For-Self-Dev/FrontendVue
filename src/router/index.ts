import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Vocabulary from '@/views/Vocabulary.vue';
import Languages from '@/views/Languages.vue';
import LanguageProfile from '@/views/LanguageProfile.vue';
import Settings from '@/views/Settings.vue';
import Error404 from '@/views/Error404.vue';
import Favorites from '@/views/Favorites.vue';
import Collections from '@/views/Collections.vue';
import Exercises from '@/views/Exercises.vue';
import About from '@/views/About.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/vocabulary',
        name: 'vocabulary',
        component: Vocabulary,
    },
    {
        path: '/languages',
        name: 'languages',
        component: Languages,
    },
    {
        path: '/languages/:slug',
        name: 'language-profile',
        component: LanguageProfile
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites,
    },
    {
        path: '/collections',
        name: 'collections',
        component: Collections,
    },
    {
        path: '/exercises',
        name: 'exercises',
        component: Exercises,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Error404,
    },
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
