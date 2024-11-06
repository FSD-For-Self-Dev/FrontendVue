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
                '32': `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.8208 0.18593C24.0642 0.429353 24.059 0.81896 23.8092 1.05614L8.25239 15.8254C8.00714 16.0582 7.61613 16.0582 7.37088 15.8254L0.190823 9.0088C-0.0590064 8.77162 -0.0641994 8.38202 0.179224 8.13859C0.422647 7.89517 0.822507 7.89011 1.07234 8.12729L7.81163 14.5254L22.9277 0.174628C23.1775 -0.0625533 23.5774 -0.0574935 23.8208 0.18593Z" fill="#272932"/>
</svg>`,
                '24': `<svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.8506 0.139447C20.0535 0.322015 20.0492 0.61422 19.841 0.792106L6.87699 11.869C6.67262 12.0437 6.34678 12.0437 6.1424 11.869L0.159019 6.7566C-0.049172 6.57872 -0.0534995 6.28651 0.149353 6.10394C0.352206 5.92138 0.685422 5.91758 0.893613 6.09547L6.5097 10.8941L19.1064 0.130971C19.3146 -0.046915 19.6478 -0.0431201 19.8506 0.139447Z" fill="#272932"/>
</svg>`,
                '20': ``,
                '16': `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9104 0.0929649C12.0321 0.214676 12.0295 0.40948 11.9046 0.528071L4.1262 7.91269C4.00357 8.02911 3.80807 8.02911 3.68544 7.91269L0.0954113 4.5044C-0.0295032 4.38581 -0.0320997 4.19101 0.0896119 4.0693C0.211323 3.94758 0.411253 3.94506 0.536168 4.06365L3.90582 7.26271L11.4638 0.0873142C11.5887 -0.0312767 11.7887 -0.0287467 11.9104 0.0929649Z" fill="#272932"/>
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