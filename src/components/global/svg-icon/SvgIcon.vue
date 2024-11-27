<script>
import { defineAsyncComponent } from 'vue'
import { sizes, defaults } from './constants'
import { setCssVar } from 'quasar';
import styles from '@/styles/_export.module.scss';

export default {
  setup() {
    // Setup colors variables
    setCssVar('neutrals-500', styles.neutrals500);
    setCssVar('neutrals-100', styles.neutrals100);
    setCssVar('neutrals-200', styles.neutrals200);
    setCssVar('neutrals-300', styles.neutrals300);
    setCssVar('neutrals-400', styles.neutrals400);
    setCssVar('neutrals-600', styles.neutrals600);
    setCssVar('neutrals-700', styles.neutrals700);
    setCssVar('neutrals-800', styles.neutrals800);
    setCssVar('neutrals-900', styles.neutrals900);

    setCssVar('primary-500', styles.primary500);
    setCssVar('primary-100', styles.primary100);
    setCssVar('primary-200', styles.primary200);
    setCssVar('primary-300', styles.primary300);
    setCssVar('primary-400', styles.primary400);
    setCssVar('primary-600', styles.primary600);
    setCssVar('primary-700', styles.primary700);
    setCssVar('primary-800', styles.primary800);
    setCssVar('primary-900', styles.primary900);

    setCssVar('secondary-500', styles.secondary500);
    setCssVar('secondary-100', styles.secondary100);
    setCssVar('secondary-200', styles.secondary200);
    setCssVar('secondary-300', styles.secondary300);
    setCssVar('secondary-400', styles.secondary400);
    setCssVar('secondary-600', styles.secondary600);
    setCssVar('secondary-700', styles.secondary700);
    setCssVar('secondary-800', styles.secondary800);
    setCssVar('secondary-900', styles.secondary900);

    setCssVar('success-500', styles.success500);
    setCssVar('success-100', styles.success100);
    setCssVar('success-200', styles.success200);
    setCssVar('success-300', styles.success300);
    setCssVar('success-400', styles.success400);
    setCssVar('success-600', styles.success600);
    setCssVar('success-700', styles.success700);
    setCssVar('success-800', styles.success800);
    setCssVar('success-900', styles.success900);

    setCssVar('danger-500', styles.danger500);
    setCssVar('danger-100', styles.danger100);
    setCssVar('danger-200', styles.danger200);
    setCssVar('danger-300', styles.danger300);
    setCssVar('danger-400', styles.danger400);
    setCssVar('danger-600', styles.danger600);
    setCssVar('danger-700', styles.danger700);
    setCssVar('danger-800', styles.danger800);
    setCssVar('danger-900', styles.danger900);

    setCssVar('warning-500', styles.warning500);
    setCssVar('warning-100', styles.warning100);
    setCssVar('warning-200', styles.warning200);
    setCssVar('warning-300', styles.warning300);
    setCssVar('warning-400', styles.warning400);
    setCssVar('warning-600', styles.warning600);
    setCssVar('warning-700', styles.warning700);
    setCssVar('warning-800', styles.warning800);
    setCssVar('warning-900', styles.warning900);
  },

  props: {
    name: {
      type: String,
      required: true
    },

    color: {
      type: String,
      default: defaults.color
    },

    size: {
      type: String,
      default: defaults.size,
      validator: (val) => Object.keys(sizes).includes(val)
    },

    hoverColor: [Boolean, String]
  },

  computed: {
    dynamicComponent() {
      const name = this.name;
      return defineAsyncComponent(() => import(`../../icons/${name}.vue`));
    },

    colorBind() {
      const color = this.color ? this.color : defaults.color;

      return this.getVarOrColorValue(color);
    },

    hoverColorBind() {
      if (this.hoverColor === false) return;

      if (this.hoverColor === true || !this.hoverColor) return defaults.hoverColor;
      return this.getVarOrColorValue(this.hoverColor);
    },

    svgSize() {
      return sizes[this.size].size
    },

    strokeWidth() {
      return sizes[this.size].strokeWidth
    }
  },

  methods: {
    getVarOrColorValue(str) {
      return str.startsWith('var:') ? str.replace(/^var:/, `var(--${defaults.varPrefix}`) + ')' : str
    }
  }
}
</script>

<template>
    <component
      :is="dynamicComponent"
      class="svg-icon"
      :width="svgSize"
      :height="svgSize"
      :stroke-width="strokeWidth"
      :class="{ 'add-hover': !!hoverColorBind }"
    />
</template>
  
<style lang="scss" scoped>
  .svg-icon {
    color: v-bind(colorBind);
    transition: color 0.1s ease-in-out;
    padding: 0.4rem;

    &.add-hover:hover {
      color: v-bind(hoverColorBind);
    }
  }
</style>
