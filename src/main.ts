import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "@/App.vue";
import blockIndex from "@/utils/robotsNoIndex";
import ApiPlugin from "./plugins/api-plugin";
import "./styles/main.scss";
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ApiPlugin);

app.mount("#app");

blockIndex();
