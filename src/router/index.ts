import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomePage.vue";

const routes = [{ path: "/", component: HomePage }] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
