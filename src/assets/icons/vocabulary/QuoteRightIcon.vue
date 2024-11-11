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
        customColor: {
            type: String,
        },
    },
    computed: {
        divStyle() {
            return { color: `${this.customColor}`, width: `${this.size}px`, height: `${this.size}px` };
        },
        svgContent() {
            const svgMap: Record<IconSize, string> = {
                '44': ``,
                '32': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.9949 17.3869C23.9949 21.0393 21.4371 24 18.2818 24C15.1265 24 12.5687 21.0393 12.5687 17.3869C12.5687 13.7345 15.1265 10.7738 18.2818 10.7738C18.9303 10.7738 19.551 10.9047 20.1321 11.1353C18.8465 2.59996 13.0964 -2.90436 18.4267 1.62581C24.3372 6.64926 24.0012 17.1848 23.9946 17.3779C23.9946 17.3809 23.9949 17.3836 23.9949 17.3869Z" fill="#C2C8D3"/>
<path d="M11.4262 17.3869C11.4262 21.0393 8.86844 24 5.7131 24C2.55776 24 0 21.0393 0 17.3869C0 13.7345 2.55781 10.7738 5.71315 10.7738C6.36166 10.7738 6.98234 10.9047 7.56344 11.1353C6.27776 2.59996 0.52767 -2.90436 5.85799 1.62581C11.7685 6.64926 11.4326 17.1848 11.4259 17.3779C11.4259 17.3809 11.4262 17.3836 11.4262 17.3869Z" fill="#C2C8D3"/>
</svg>`,
                '24': ``,
                '20': ``,
                '16': ``,
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