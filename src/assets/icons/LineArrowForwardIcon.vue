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
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5764 0.202772C12.3079 0.473135 12.3079 0.91148 12.5764 1.18184L19.6527 8.30769H0.6875C0.307804 8.30769 0 8.61765 0 9C0 9.38235 0.307804 9.69231 0.6875 9.69231H19.6527L12.5764 16.8182C12.3079 17.0885 12.3079 17.5269 12.5764 17.7972C12.8448 18.0676 13.2802 18.0676 13.5486 17.7972L21.7986 9.48954C22.0671 9.21917 22.0671 8.78083 21.7986 8.51046L13.5486 0.202772C13.2802 -0.0675908 12.8448 -0.0675908 12.5764 0.202772Z" fill="#272932"/>
</svg>`,
                '24': `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.14645 0.157712C8.95118 0.367994 8.95118 0.708929 9.14645 0.919211L14.2929 6.46154H0.5C0.223858 6.46154 0 6.70262 0 7C0 7.29738 0.223858 7.53846 0.5 7.53846H14.2929L9.14645 13.0808C8.95118 13.2911 8.95118 13.632 9.14645 13.8423C9.34171 14.0526 9.65829 14.0526 9.85355 13.8423L15.8536 7.38075C16.0488 7.17047 16.0488 6.82953 15.8536 6.61925L9.85355 0.157712C9.65829 -0.0525706 9.34171 -0.0525706 9.14645 0.157712Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.85984 0.112651C6.71339 0.262853 6.71339 0.506378 6.85984 0.65658L10.7197 4.61538H0.375C0.167893 4.61538 0 4.78758 0 5C0 5.21242 0.167893 5.38462 0.375 5.38462H10.7197L6.85984 9.34342C6.71339 9.49362 6.71339 9.73715 6.85984 9.88735C7.00628 10.0376 7.24372 10.0376 7.39016 9.88735L11.8902 5.27196C12.0366 5.12176 12.0366 4.87824 11.8902 4.72804L7.39016 0.112651C7.24372 -0.0375504 7.00628 -0.0375504 6.85984 0.112651Z" fill="#272932"/>
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