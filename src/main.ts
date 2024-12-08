import { app } from './plugins/main-app';
import '@/plugins/quasar';
import '@/plugins/pinia';
import '@/plugins/api-plugin';
import '@/plugins/router';
import '@/plugins/global-components';
import '@/plugins/i18n';
import '@/styles/main.scss';
import blockIndex from '@/utils/robotsNoIndex';

app.mount('#app');

blockIndex();
