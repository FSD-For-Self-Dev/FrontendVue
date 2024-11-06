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
        }
    },
    computed: {
        divStyle() {
            return { color: this.customColor || 'currentColor', width: `${this.size}px`, height: `${this.size}px` };
        },
        svgContent() {
            const svgMap: Record<IconSize, string> = {
                '44': ``,
                '32': `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.001 0C24.8316 0 32.001 7.16938 32.001 16C32.001 24.8306 24.8316 32 16.001 32C7.17035 32 0.000976562 24.8306 0.000976562 16C0.000976562 7.16938 7.17035 0 16.001 0ZM25.5832 11.1861C25.3532 10.3256 24.6755 9.648 23.815 9.418C22.2552 9 16.001 9 16.001 9C16.001 9 9.74679 9 8.18691 9.418C7.3266 9.648 6.64879 10.3256 6.41879 11.1861C6.00098 12.7458 6.00098 16.0001 6.00098 16.0001C6.00098 16.0001 6.00098 19.2543 6.41879 20.8139C6.64879 21.6744 7.3266 22.3523 8.18691 22.5822C9.74679 23 16.001 23 16.001 23C16.001 23 22.2552 23 23.815 22.5822C24.6755 22.3523 25.3532 21.6744 25.5832 20.8139C26.001 19.2543 26.001 16.0001 26.001 16.0001C26.001 16.0001 26.001 12.7458 25.5832 11.1861ZM14.0009 19.0002V13.0001L19.197 16.0001L14.0009 19.0002Z" fill="#9EB4FF"/>
</svg>`,
                '24': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.623 0 24 5.37703 24 12C24 18.623 18.623 24 12 24C5.37703 24 0 18.623 0 12C0 5.37703 5.37703 0 12 0ZM19.1866 8.38959C19.0141 7.74417 18.5059 7.236 17.8605 7.0635C16.6906 6.75 12 6.75 12 6.75C12 6.75 7.30936 6.75 6.13945 7.0635C5.49422 7.236 4.98586 7.74417 4.81336 8.38959C4.5 9.55936 4.5 12.0001 4.5 12.0001C4.5 12.0001 4.5 14.4407 4.81336 15.6104C4.98586 16.2558 5.49422 16.7642 6.13945 16.9366C7.30936 17.25 12 17.25 12 17.25C12 17.25 16.6906 17.25 17.8605 16.9366C18.5059 16.7642 19.0141 16.2558 19.1866 15.6104C19.5 14.4407 19.5 12.0001 19.5 12.0001C19.5 12.0001 19.5 9.55936 19.1866 8.38959ZM10.5 14.2501V9.75005L14.397 12.0001L10.5 14.2501Z" fill="#9EB4FF"/>
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