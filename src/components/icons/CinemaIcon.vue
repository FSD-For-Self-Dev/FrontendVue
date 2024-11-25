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
                '32': `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 24.25V1.75M19 24.25V1.75M1 13H25M1 7H7M19 7H25M1 19H7M19 19H25M1 20.5001L1 5.5C1 3.01472 3.01472 1 5.5 1L20.5 1C22.9853 1 25 3.01472 25 5.5V20.5001C25 22.9854 22.9853 25.0001 20.5 25.0001H5.5C3.01472 25.0001 1 22.9854 1 20.5001Z" stroke="#272932" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
                '24': `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.99997 20.3749V1.625M15.9999 20.3749V1.625M1 10.9999H20.9999M1 5.99997H5.99997M15.9999 5.99997H20.9999M1 15.9999H5.99997M15.9999 15.9999H20.9999M1 17.25L1 4.74998C1 2.67892 2.67893 1 4.74998 1L17.2499 1C19.321 1 20.9999 2.67892 20.9999 4.74998V17.25C20.9999 19.3211 19.321 21 17.2499 21H4.74998C2.67892 21 1 19.3211 1 17.25Z" stroke="#272932" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
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