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
<path d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12Z" fill="#364DB7"/>
<path d="M12 24C17.1596 24 21.5581 20.7435 23.2536 16.1739H0.746344C2.44191 20.7435 6.84042 24 12 24Z" fill="#DB284D"/>
<path d="M12 0C6.84042 0 2.44191 3.25655 0.746393 7.82611L23.2536 7.82611C21.5581 3.25655 17.1596 0 12 0Z" fill="white"/>
</svg>`,
                '24': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.76837e-07 10C4.76837e-07 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 4.76837e-07 4.47715 4.76837e-07 10Z" fill="#364DB7"/>
<path d="M10 20C14.2996 20 17.9651 17.2863 19.378 13.4782L0.621953 13.4782C2.03492 17.2863 5.70035 20 10 20Z" fill="#DB284D"/>
<path d="M10 0C5.70035 0 2.03492 2.71379 0.621995 6.52176L19.378 6.52176C17.9651 2.71379 14.2996 0 10 0Z" fill="white"/>
</svg>`,
                '20': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-4.76837e-07 8C-4.76837e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 -4.76837e-07 3.58172 -4.76837e-07 8Z" fill="#364DB7"/>
<path d="M8 16C11.4397 16 14.3721 13.829 15.5024 10.7826L0.497562 10.7826C1.62794 13.829 4.56028 16 8 16Z" fill="#DB284D"/>
<path d="M8 0C4.56028 0 1.62794 2.17103 0.497595 5.21741L15.5024 5.21741C14.3721 2.17103 11.4397 0 8 0Z" fill="white"/>
</svg>`,
                '16': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.76837e-07 7C4.76837e-07 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 4.76837e-07 3.13401 4.76837e-07 7Z" fill="#364DB7"/>
<path d="M7 14C10.0098 14 12.5756 12.1004 13.5646 9.43477H0.435368C1.42445 12.1004 3.99025 14 7 14Z" fill="#DB284D"/>
<path d="M7 0C3.99025 0 1.42445 1.89965 0.435396 4.56523L13.5646 4.56523C12.5756 1.89965 10.0098 0 7 0Z" fill="white"/>
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