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
                '32': `<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 17.6154H4.82609C2.713 17.6154 1 19.2685 1 21.3077M23 17.6154V23.1538C23 24.1735 22.1435 25 21.087 25H4.82609C2.713 25 1 23.3469 1 21.3077M23 17.6154V2.84615C23 1.82655 22.1435 1 21.087 1H7.21739M1 21.3077V4.69231C1 2.6531 2.713 1 4.82609 1H7.21739M12.0743 6.53846H17.3207M12.0743 12.0769H17.3207M7.21739 17.5V1" stroke="#272932" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
                '24': `<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 14.8462H4.13043C2.40154 14.8462 1 16.2237 1 17.9231M19 14.8462V19.4615C19 20.3112 18.2992 21 17.4348 21H4.13044C2.40154 21 1 19.6224 1 17.9231M19 14.8462V2.53846C19 1.68879 18.2992 1 17.4348 1H6.08696M1 17.9231V4.07692C1 2.37759 2.40154 1 4.13043 1H6.08696M10.0608 5.61538H14.3533M10.0608 10.2308H14.3533M6.08696 14.75V1" stroke="#272932" stroke-linecap="round" stroke-linejoin="round"/>
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