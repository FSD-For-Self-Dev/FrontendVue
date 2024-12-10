import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Vocabulary from '@/views/Vocabulary.vue';
import Languages from '@/views/Languages.vue';
import Error404 from '@/views/Error404.vue';
// import Test from '@/views/Test.vue';
import Settings from '@/views/Settings.vue';
import { useUserStore } from '@/store/user';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/vocabulary',
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
  // {
  //     path: '/test',
  //     component: Test,
  // },
  {
    path: '/settings',
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
    path: '/:catchAll(.*)',
    component: Error404,
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
