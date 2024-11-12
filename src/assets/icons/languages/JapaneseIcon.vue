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
            return { color: this.customColor || 'currentColor', width: `${this.size}px`, height: `${this.size}px` };
        },
        svgContent() {
            const svgMap: Record<IconSize, string> = {
                '44': ``,
                '32': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#EEEEEE"/>
<path d="M12 17.2174C14.8815 17.2174 17.2174 14.8815 17.2174 12C17.2174 9.11852 14.8815 6.78263 12 6.78263C9.11852 6.78263 6.78263 9.11852 6.78263 12C6.78263 14.8815 9.11852 17.2174 12 17.2174Z" fill="#DB284D"/>
</svg>`,
                '24': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#EEEEEE"/>
<path d="M10 14.3478C12.4012 14.3478 14.3478 12.4012 14.3478 10C14.3478 7.59877 12.4012 5.65219 10 5.65219C7.59877 5.65219 5.65219 7.59877 5.65219 10C5.65219 12.4012 7.59877 14.3478 10 14.3478Z" fill="#DB284D"/>
</svg>`,
                '20': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#EEEEEE"/>
<path d="M8 11.4783C9.92098 11.4783 11.4783 9.92098 11.4783 8C11.4783 6.07902 9.92098 4.52175 8 4.52175C6.07902 4.52175 4.52175 6.07902 4.52175 8C4.52175 9.92098 6.07902 11.4783 8 11.4783Z" fill="#DB284D"/>
</svg>`,
                '16': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#EEEEEE"/>
<path d="M7 10.0435C8.68086 10.0435 10.0435 8.68086 10.0435 7C10.0435 5.31914 8.68086 3.95653 7 3.95653C5.31914 3.95653 3.95653 5.31914 3.95653 7C3.95653 8.68086 5.31914 10.0435 7 10.0435Z" fill="#DB284D"/>
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