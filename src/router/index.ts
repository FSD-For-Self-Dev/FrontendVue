import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/user';
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
    beforeEnter: (to, from, next) => {
      const { authStatus } = useUserStore();
      if (!authStatus) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/languages',
    name: 'languages',
    component: Languages,
    beforeEnter: (to, from, next) => {
      const { authStatus } = useUserStore();
      if (!authStatus) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/languages/:slug',
    name: 'language-profile',
    component: LanguageProfile,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    beforeEnter: (to, from, next) => {
      const { authStatus } = useUserStore();
      if (!authStatus) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    beforeEnter: (to, from, next) => {
      const { authStatus } = useUserStore();
      if (!authStatus) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/collections',
    name: 'collections',
    component: Collections,
    beforeEnter: (to, from, next) => {
      const { authStatus } = useUserStore();
      if (!authStatus) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: Exercises,
    beforeEnter: (to, from, next) => {
      const { authStatus } = useUserStore();
      if (!authStatus) {
        next('/');
      } else {
        next();
      }
    },
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
