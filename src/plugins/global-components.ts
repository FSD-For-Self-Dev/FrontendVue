import { defineAsyncComponent } from 'vue';
import { app } from './main-app';

const globalComponentsPaths = import.meta.glob('/src/components/global/**/*.vue');

Object.entries(globalComponentsPaths).forEach(([path, module]) => {
  // "./components/SvgIcon.vue" -> "SvgIcon"
  const componentName = path.split('/').pop()?.replace(/\.vue$/, '');

  if (componentName) {
    app.component(componentName, defineAsyncComponent(module))
  };
});
