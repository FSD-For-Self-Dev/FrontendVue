import { app } from './plugins/main-app';
import '@/plugins/quasar';
import '@/plugins/pinia';
import '@/plugins/api-plugin';
import '@/plugins/router';
import '@/plugins/global-components';
import '@/styles/main.scss';
import blockIndex from '@/utils/robotsNoIndex';
import 'vue3-carousel/dist/carousel.css'

app.mount('#app');

blockIndex();
