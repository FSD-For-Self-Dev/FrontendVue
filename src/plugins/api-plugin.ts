import type { App } from "vue";
import api from "@/api";

class ApiPlugin {
  install(app: App) {
    app.config.globalProperties.$api = api;
  }
}

export default new ApiPlugin();
