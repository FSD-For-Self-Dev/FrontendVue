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
<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FAFAFA"/>
<path d="M24 12C24 6.84042 20.7435 2.44191 16.1739 0.746391V23.2537C20.7435 21.5581 24 17.1596 24 12Z" fill="#DB284D"/>
<path d="M0 12C0 17.1596 3.25655 21.5581 7.82611 23.2536V0.746391C3.25655 2.44191 0 6.84042 0 12Z" fill="#3467B7"/>
</svg>`,
                '24': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#FAFAFA"/>
<path d="M20 10C20 5.70035 17.2863 2.03492 13.4782 0.621992V19.378C17.2863 17.9651 20 14.2996 20 10Z" fill="#DB284D"/>
<path d="M0 10C0 14.2996 2.71379 17.9651 6.52176 19.378V0.621992C2.71379 2.03492 0 5.70035 0 10Z" fill="#3467B7"/>
</svg>`,
                '20': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#FAFAFA"/>
<path d="M16 8C16 4.56028 13.829 1.62794 10.7826 0.497594V15.5024C13.829 14.3721 16 11.4397 16 8Z" fill="#DB284D"/>
<path d="M0 8C0 11.4397 2.17103 14.3721 5.21741 15.5024V0.497594C2.17103 1.62794 0 4.56028 0 8Z" fill="#3467B7"/>
</svg>`,
                '16': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#FAFAFA"/>
<path d="M14 7C14 3.99025 12.1004 1.42445 9.43477 0.435395V13.5646C12.1004 12.5756 14 10.0098 14 7Z" fill="#DB284D"/>
<path d="M0 7C0 10.0098 1.89965 12.5756 4.56523 13.5646V0.435395C1.89965 1.42445 0 3.99025 0 7Z" fill="#3467B7"/>
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