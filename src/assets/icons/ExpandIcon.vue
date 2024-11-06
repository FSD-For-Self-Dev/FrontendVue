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
                '32': ``,
                '24': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.8449 0.155061C18.0517 0.361809 18.0517 0.697014 17.8449 0.903762L0.903762 17.8449C0.697014 18.0517 0.361809 18.0517 0.155061 17.8449C-0.051687 17.6382 -0.051687 17.303 0.155061 17.0962L17.0962 0.155061C17.303 -0.051687 17.6382 -0.051687 17.8449 0.155061ZM17.8449 6.31549C18.0517 6.52224 18.0517 6.85744 17.8449 7.06419L7.06419 17.8449C6.85744 18.0517 6.52224 18.0517 6.31549 17.8449C6.10874 17.6382 6.10874 17.303 6.31549 17.0962L17.0962 6.31549C17.303 6.10874 17.6382 6.10874 17.8449 6.31549Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8966 0.103374C12.0345 0.241206 12.0345 0.464676 11.8966 0.602508L0.602508 11.8966C0.464676 12.0345 0.241206 12.0345 0.103374 11.8966C-0.034458 11.7588 -0.034458 11.5353 0.103374 11.3975L11.3975 0.103374C11.5353 -0.034458 11.7588 -0.034458 11.8966 0.103374ZM11.8966 4.21032C12.0345 4.34816 12.0345 4.57163 11.8966 4.70946L4.70946 11.8966C4.57163 12.0345 4.34816 12.0345 4.21032 11.8966C4.07249 11.7588 4.07249 11.5353 4.21032 11.3975L11.3975 4.21032C11.5353 4.07249 11.7588 4.07249 11.8966 4.21032Z" fill="#272932"/>
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