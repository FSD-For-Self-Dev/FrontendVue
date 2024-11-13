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
                '32': `<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.42364 0.202772C9.69212 0.473135 9.69212 0.91148 9.42364 1.18184L2.34727 8.30769H21.3125C21.6922 8.30769 22 8.61765 22 9C22 9.38235 21.6922 9.69231 21.3125 9.69231H2.34727L9.42364 16.8182C9.69212 17.0885 9.69212 17.5269 9.42364 17.7972C9.15515 18.0676 8.71985 18.0676 8.45136 17.7972L0.201364 9.48954C-0.0671214 9.21917 -0.0671214 8.78083 0.201364 8.51046L8.45136 0.202772C8.71985 -0.0675908 9.15515 -0.0675908 9.42364 0.202772Z" fill="#272932"/>
</svg>`,
                '24': `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.85355 0.157712C7.04882 0.367994 7.04882 0.708929 6.85355 0.919211L1.70711 6.46154H15.5C15.7761 6.46154 16 6.70262 16 7C16 7.29738 15.7761 7.53846 15.5 7.53846H1.70711L6.85355 13.0808C7.04882 13.2911 7.04882 13.632 6.85355 13.8423C6.65829 14.0526 6.34171 14.0526 6.14645 13.8423L0.146447 7.38075C-0.0488155 7.17047 -0.0488155 6.82953 0.146447 6.61925L6.14645 0.157712C6.34171 -0.0525706 6.65829 -0.0525706 6.85355 0.157712Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.14016 0.112651C5.28661 0.262853 5.28661 0.506378 5.14016 0.65658L1.28033 4.61538H11.625C11.8321 4.61538 12 4.78758 12 5C12 5.21242 11.8321 5.38462 11.625 5.38462H1.28033L5.14016 9.34342C5.28661 9.49362 5.28661 9.73715 5.14016 9.88735C4.99372 10.0376 4.75628 10.0376 4.60984 9.88735L0.109835 5.27196C-0.0366117 5.12176 -0.0366117 4.87824 0.109835 4.72804L4.60984 0.112651C4.75628 -0.0375504 4.99372 -0.0375504 5.14016 0.112651Z" fill="#272932"/>
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