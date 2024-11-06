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
                '24': `<svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.206396 15.877C-0.0364023 15.6888 -0.0697927 15.3526 0.131817 15.1259L6.67586 7.77034L0.143679 0.886956C-0.0655693 0.666458 -0.0436817 0.32939 0.192566 0.134091C0.428813 -0.0612068 0.789958 -0.0407772 0.999206 0.179719L7.85634 7.40552C8.04329 7.60253 8.04833 7.89737 7.8682 8.09985L1.01107 15.8074C0.809458 16.034 0.449195 16.0651 0.206396 15.877Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.154797 11.9077C-0.0273018 11.7666 -0.0523445 11.5144 0.0988626 11.3445L5.0069 5.82775L0.107759 0.665217C-0.0491769 0.499844 -0.0327612 0.247043 0.144424 0.100569C0.32161 -0.0459051 0.592469 -0.0305834 0.749405 0.134789L5.89225 5.55414C6.03247 5.7019 6.03625 5.92303 5.90115 6.07488L0.758301 11.8555C0.607094 12.0255 0.336896 12.0489 0.154797 11.9077Z" fill="#272932"/>
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