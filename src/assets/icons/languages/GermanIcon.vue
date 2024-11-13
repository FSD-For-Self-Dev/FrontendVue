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
<path d="M0.746391 16.1739C2.44191 20.7435 6.84042 24 12 24C17.1596 24 21.5581 20.7435 23.2536 16.1739L12 15.1305L0.746391 16.1739Z" fill="#FFD869"/>
<path d="M12 0C6.84042 0 2.44191 3.2565 0.746391 7.82611L12 8.86955L23.2536 7.82606C21.5581 3.2565 17.1596 0 12 0Z" fill="#272932"/>
<path d="M0.746391 7.82611C0.264047 9.12609 0 10.5322 0 12C0 13.4678 0.264047 14.8739 0.746391 16.1739H23.2536C23.736 14.8739 24 13.4678 24 12C24 10.5322 23.736 9.12605 23.2536 7.82606L0.746391 7.82611Z" fill="#CA2744"/>
</svg>`,
                '24': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.621992 13.4782C2.03492 17.2862 5.70035 20 10 20C14.2996 20 17.9651 17.2862 19.378 13.4782L10 12.6087L0.621992 13.4782Z" fill="#FFD869"/>
<path d="M10 0C5.70035 0 2.03492 2.71375 0.621992 6.52176L10 7.39129L19.378 6.52172C17.9651 2.71375 14.2996 0 10 0Z" fill="#272932"/>
<path d="M0.621992 6.52176C0.220039 7.60508 0 8.7768 0 10C0 11.2232 0.220039 12.3949 0.621992 13.4782H19.378C19.78 12.3949 20 11.2232 20 10C20 8.7768 19.78 7.60504 19.378 6.52172L0.621992 6.52176Z" fill="#CA2744"/>
</svg>`,
                '20': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.497594 10.7826C1.62794 13.829 4.56028 16 8 16C11.4397 16 14.3721 13.829 15.5024 10.7826L8 10.087L0.497594 10.7826Z" fill="#FFD869"/>
<path d="M8 0C4.56028 0 1.62794 2.171 0.497594 5.21741L8 5.91303L15.5024 5.21737C14.3721 2.171 11.4397 0 8 0Z" fill="#272932"/>
<path d="M0.497594 5.21741C0.176031 6.08406 0 7.02144 0 8C0 8.97856 0.176031 9.91594 0.497594 10.7826H15.5024C15.824 9.91594 16 8.97856 16 8C16 7.02144 15.824 6.08403 15.5024 5.21737L0.497594 5.21741Z" fill="#CA2744"/>
</svg>`,
                '16': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.435395 9.43477C1.42445 12.1003 3.99025 14 7 14C10.0098 14 12.5756 12.1003 13.5646 9.43477L7 8.8261L0.435395 9.43477Z" fill="#FFD869"/>
<path d="M7 0C3.99025 0 1.42445 1.89962 0.435395 4.56523L7 5.1739L13.5646 4.5652C12.5756 1.89962 10.0098 0 7 0Z" fill="#272932"/>
<path d="M0.435395 4.56523C0.154027 5.32355 0 6.14376 0 7C0 7.85624 0.154027 8.67645 0.435395 9.43477H13.5646C13.846 8.67645 14 7.85624 14 7C14 6.14376 13.846 5.32353 13.5646 4.5652L0.435395 4.56523Z" fill="#CA2744"/>
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