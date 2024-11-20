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
                '24': `<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.123029 0.206396C0.311198 -0.0364023 0.647445 -0.0697927 0.874057 0.131817L8.22966 6.67586L15.113 0.143679C15.3335 -0.0655693 15.6706 -0.0436817 15.8659 0.192566C16.0612 0.428813 16.0408 0.789958 15.8203 0.999206L8.59448 7.85634C8.39747 8.04329 8.10263 8.04833 7.90015 7.8682L0.192637 1.01107C-0.0339755 0.809458 -0.0651399 0.449195 0.123029 0.206396Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0922718 0.154797C0.233399 -0.0273018 0.485583 -0.0523445 0.655542 0.0988626L6.17225 5.0069L11.3348 0.107759C11.5002 -0.0491769 11.753 -0.0327612 11.8994 0.144424C12.0459 0.32161 12.0306 0.592469 11.8652 0.749405L6.44586 5.89225C6.2981 6.03247 6.07697 6.03625 5.92512 5.90115L0.144477 0.758301C-0.0254817 0.607094 -0.0488549 0.336896 0.0922718 0.154797Z" fill="#272932"/>
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