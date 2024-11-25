import { app } from './plugins/main-app';
import '@/plugins/quasar';
import '@/plugins/pinia';
import '@/plugins/api-plugin';
import router from '@/router';
import blockIndex from '@/utils/robotsNoIndex';

import '@/styles/main.scss';

app.use(router);

app.mount('#app');

blockIndex();
