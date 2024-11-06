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
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.157713 0.157712C0.367995 -0.0525706 0.70893 -0.0525706 0.919213 0.157712L7.38075 6.61925C7.59103 6.82953 7.59103 7.17047 7.38075 7.38075L0.919211 13.8423C0.708929 14.0526 0.367994 14.0526 0.157712 13.8423C-0.0525706 13.632 -0.0525706 13.2911 0.157712 13.0808L6.2385 7L0.157713 0.919211C-0.0525694 0.708929 -0.0525694 0.367994 0.157713 0.157712ZM6.61925 0.157712C6.82953 -0.0525706 7.17047 -0.0525706 7.38075 0.157712L13.8423 6.61925C13.9433 6.72023 14 6.85719 14 7C14 7.14281 13.9433 7.27977 13.8423 7.38075L7.38075 13.8423C7.17047 14.0526 6.82953 14.0526 6.61925 13.8423C6.40897 13.632 6.40897 13.2911 6.61925 13.0808L12.7 7L6.61925 0.919211C6.40897 0.708929 6.40897 0.367994 6.61925 0.157712Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.112652 0.112651C0.262854 -0.0375504 0.506379 -0.0375504 0.65658 0.112651L5.27196 4.72804C5.42217 4.87824 5.42217 5.12176 5.27196 5.27196L0.656579 9.88735C0.506378 10.0376 0.262853 10.0376 0.112651 9.88735C-0.0375504 9.73715 -0.0375504 9.49362 0.112651 9.34342L4.45607 5L0.112652 0.656579C-0.0375496 0.506378 -0.0375496 0.262853 0.112652 0.112651ZM4.72804 0.112651C4.87824 -0.0375504 5.12176 -0.0375504 5.27196 0.112651L9.88735 4.72804C9.95948 4.80017 10 4.89799 10 5C10 5.10201 9.95948 5.19984 9.88735 5.27196L5.27196 9.88735C5.12176 10.0376 4.87824 10.0376 4.72804 9.88735C4.57783 9.73715 4.57783 9.49362 4.72804 9.34342L9.07146 5L4.72804 0.65658C4.57783 0.506378 4.57783 0.262853 4.72804 0.112651Z" fill="#272932"/>
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