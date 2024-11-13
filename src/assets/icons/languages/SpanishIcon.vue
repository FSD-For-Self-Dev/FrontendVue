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
<path d="M0 12C0 13.4678 0.264047 14.8739 0.746391 16.1739L12 17.2174L23.2536 16.1739C23.736 14.8739 24 13.4678 24 12C24 10.5322 23.736 9.12609 23.2536 7.82611L12 6.78263L0.746391 7.82611C0.264047 9.12609 0 10.5322 0 12Z" fill="#FFC943"/>
<path d="M23.2536 7.82611C21.5581 3.25655 17.1596 0 12 0C6.84042 0 2.44191 3.25655 0.746391 7.82611H23.2536Z" fill="#CA2744"/>
<path d="M0.746391 16.1739C2.44191 20.7435 6.84042 24 12 24C17.1596 24 21.5581 20.7435 23.2536 16.1739H0.746391Z" fill="#CA2744"/>
</svg>`,
                '24': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10C0 11.2232 0.220039 12.3949 0.621992 13.4782L10 14.3478L19.378 13.4782C19.78 12.3949 20 11.2232 20 10C20 8.7768 19.78 7.60508 19.378 6.52176L10 5.65219L0.621992 6.52176C0.220039 7.60508 0 8.7768 0 10Z" fill="#FFC943"/>
<path d="M19.378 6.52176C17.9651 2.71379 14.2996 0 10 0C5.70035 0 2.03492 2.71379 0.621992 6.52176H19.378Z" fill="#CA2744"/>
<path d="M0.621992 13.4782C2.03492 17.2862 5.70035 20 10 20C14.2996 20 17.9651 17.2862 19.378 13.4782H0.621992Z" fill="#CA2744"/>
</svg>`,
                '20': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 8.97856 0.176031 9.91594 0.497594 10.7826L8 11.4783L15.5024 10.7826C15.824 9.91594 16 8.97856 16 8C16 7.02144 15.824 6.08406 15.5024 5.21741L8 4.52175L0.497594 5.21741C0.176031 6.08406 0 7.02144 0 8Z" fill="#FFC943"/>
<path d="M15.5024 5.21741C14.3721 2.17103 11.4397 0 8 0C4.56028 0 1.62794 2.17103 0.497594 5.21741H15.5024Z" fill="#CA2744"/>
<path d="M0.497594 10.7826C1.62794 13.829 4.56028 16 8 16C11.4397 16 14.3721 13.829 15.5024 10.7826H0.497594Z" fill="#CA2744"/>
</svg>`,
                '16': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 7C0 7.85624 0.154027 8.67645 0.435395 9.43477L7 10.0435L13.5646 9.43477C13.846 8.67645 14 7.85624 14 7C14 6.14376 13.846 5.32355 13.5646 4.56523L7 3.95653L0.435395 4.56523C0.154027 5.32355 0 6.14376 0 7Z" fill="#FFC943"/>
<path d="M13.5646 4.56523C12.5756 1.89965 10.0098 0 7 0C3.99025 0 1.42445 1.89965 0.435395 4.56523H13.5646Z" fill="#CA2744"/>
<path d="M0.435395 9.43477C1.42445 12.1003 3.99025 14 7 14C10.0098 14 12.5756 12.1003 13.5646 9.43477H0.435395Z" fill="#CA2744"/>
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