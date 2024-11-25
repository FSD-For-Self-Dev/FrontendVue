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
<path d="M0.00510273 17.3869C0.00510273 21.0393 2.56286 24 5.71815 24C8.8735 24 11.4313 21.0393 11.4313 17.3869C11.4313 13.7345 8.8735 10.7738 5.71815 10.7738C5.06969 10.7738 4.44896 10.9047 3.86786 11.1353C5.15354 2.59996 10.9036 -2.90436 5.57332 1.62581C-0.337198 6.64926 -0.00122742 17.1848 0.00538617 17.3779C0.00538617 17.3809 0.00510273 17.3836 0.00510273 17.3869Z" fill="#C2C8D3"/>
<path d="M12.5738 17.3869C12.5738 21.0393 15.1316 24 18.2869 24C21.4422 24 24 21.0393 24 17.3869C24 13.7345 21.4422 10.7738 18.2869 10.7738C17.6383 10.7738 17.0177 10.9047 16.4366 11.1353C17.7222 2.59996 23.4723 -2.90436 18.142 1.62581C12.2315 6.64926 12.5674 17.1848 12.5741 17.3779C12.5741 17.3809 12.5738 17.3836 12.5738 17.3869Z" fill="#C2C8D3"/>
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