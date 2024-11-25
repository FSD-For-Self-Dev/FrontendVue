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
                '24': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7936 19.877C16.0364 19.6888 16.0698 19.3526 15.8682 19.1259L9.32414 11.7703L15.8563 4.88696C16.0656 4.66646 16.0437 4.32939 15.8074 4.13409C15.5712 3.93879 15.21 3.95922 15.0008 4.17972L8.14366 11.4055C7.95671 11.6025 7.95167 11.8974 8.1318 12.0998L14.9889 19.8074C15.1905 20.034 15.5508 20.0651 15.7936 19.877Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.8452 11.9077C6.0273 11.7666 6.05234 11.5144 5.90114 11.3445L0.993104 5.82775L5.89224 0.665217C6.04918 0.499844 6.03276 0.247043 5.85558 0.100569C5.67839 -0.0459051 5.40753 -0.0305834 5.2506 0.134789L0.107748 5.55414C-0.0324712 5.7019 -0.0362487 5.92303 0.0988522 6.07488L5.2417 11.8555C5.39291 12.0255 5.6631 12.0489 5.8452 11.9077Z" fill="#272932"/>
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