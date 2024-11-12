<template>
    <div class="svg" :style="divStyle" v-html="svgContent"></div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { IconSize } from '@/types/components/icon';

export default {
    props: {
        size: {
            type: String as PropType<IconSize>,
            required: true
        },
        outline: {
            type: Boolean,
            default: true
        },
        customColor: {
            type: String,
        },
    },
    computed: {
        divStyle() {
            return { color: this.customColor || 'currentColor', width: `${this.size}px`, height: `${this.size}px` };
        },
        svgContent() {
            const svgMap: Record<IconSize, string> = {
                '44': ``,
                '32': ``,
                '24': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.38075 0.157712C7.59103 0.367994 7.59103 0.708929 7.38075 0.919211L1.29996 7L7.38075 13.0808C7.59103 13.2911 7.59103 13.632 7.38075 13.8423C7.17047 14.0526 6.82953 14.0526 6.61925 13.8423L0.157712 7.38075C-0.0525706 7.17047 -0.0525706 6.82953 0.157712 6.61925L6.61925 0.157712C6.82953 -0.0525706 7.17047 -0.0525706 7.38075 0.157712ZM13.8423 0.157712C14.0526 0.367994 14.0526 0.708929 13.8423 0.919211L7.7615 7L13.8423 13.0808C14.0526 13.2911 14.0526 13.632 13.8423 13.8423C13.632 14.0526 13.2911 14.0526 13.0808 13.8423L6.61925 7.38075C6.51827 7.27977 6.46154 7.14281 6.46154 7C6.46154 6.85719 6.51827 6.72023 6.61925 6.61925L13.0808 0.157712C13.2911 -0.0525706 13.632 -0.0525706 13.8423 0.157712Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.27196 0.112651C5.42217 0.262853 5.42217 0.506378 5.27196 0.65658L0.928544 5L5.27196 9.34342C5.42217 9.49362 5.42217 9.73715 5.27196 9.88735C5.12176 10.0376 4.87824 10.0376 4.72804 9.88735L0.112651 5.27196C-0.0375504 5.12176 -0.0375504 4.87824 0.112651 4.72804L4.72804 0.112651C4.87824 -0.0375504 5.12176 -0.0375504 5.27196 0.112651ZM9.88735 0.112651C10.0376 0.262853 10.0376 0.506378 9.88735 0.65658L5.54393 5L9.88735 9.34342C10.0376 9.49362 10.0376 9.73715 9.88735 9.88735C9.73715 10.0376 9.49362 10.0376 9.34342 9.88735L4.72804 5.27196C4.65591 5.19983 4.61538 5.10201 4.61538 5C4.61538 4.89799 4.65591 4.80017 4.72804 4.72804L9.34342 0.112651C9.49362 -0.0375504 9.73715 -0.0375504 9.88735 0.112651Z" fill="#272932"/>
</svg>`,
                '12': ``,
            };
            return svgMap[this.size] || '';
        }
    }
}
</script>

<style lang="scss" scoped>
.svg {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>