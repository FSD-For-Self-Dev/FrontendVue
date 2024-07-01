import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Vocabulary from "@/views/Vocabulary.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/vocabulary",
    component: Vocabulary,
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
