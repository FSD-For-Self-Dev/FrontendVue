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
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.123029 7.7936C0.311198 8.0364 0.647445 8.06979 0.874057 7.86818L8.22966 1.32414L15.113 7.85632C15.3335 8.06557 15.6706 8.04368 15.8659 7.80743C16.0612 7.57119 16.0408 7.21004 15.8203 7.00079L8.59448 0.143664C8.39747 -0.0432949 8.10263 -0.0483322 7.90015 0.131803L0.192637 6.98893C-0.0339755 7.19054 -0.0651399 7.55081 0.123029 7.7936Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0922718 5.8452C0.233399 6.0273 0.485583 6.05234 0.655542 5.90114L6.17225 0.993104L11.3348 5.89224C11.5002 6.04918 11.753 6.03276 11.8994 5.85558C12.0459 5.67839 12.0306 5.40753 11.8652 5.2506L6.44586 0.107748C6.2981 -0.0324712 6.07697 -0.0362487 5.92512 0.0988522L0.144477 5.2417C-0.0254817 5.39291 -0.0488549 5.6631 0.0922718 5.8452Z" fill="#272932"/>
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