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
            return { color: 'white', backgroundColor: this.customColor || 'currentColor', width: `${this.size}px`, height: `${this.size}px` };
        },
        svgContent() {
            const svgMap: Record<IconSize, string> = {
                '44': ``,
                '32': `<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2196 0.333252C17.7537 0.333252 18.1566 0.801796 17.9411 1.67329L15.3266 13.996C15.1439 14.8722 14.6144 15.083 13.8835 14.6754L7.6472 10.0696C7.62301 10.0522 7.60331 10.0294 7.58972 10.0029C7.57613 9.97642 7.56904 9.94708 7.56904 9.91732C7.56904 9.88755 7.57613 9.85822 7.58972 9.83174C7.60331 9.80526 7.62301 9.78239 7.6472 9.76504L14.8487 3.26165C15.1767 2.97115 14.7784 2.83059 14.3474 3.09298L5.30916 8.79516C5.28175 8.81303 5.25063 8.82443 5.21816 8.82849C5.18568 8.83255 5.15271 8.82916 5.12174 8.81858L1.28437 7.60505C0.431618 7.35673 0.431618 6.77105 1.47647 6.35404L16.8307 0.431646C16.9524 0.373229 17.0847 0.339773 17.2196 0.333252Z" fill="white"/>
</svg>`,
                '24': `<svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4144 0C12.815 0 13.1172 0.351408 12.9556 1.00503L10.9947 10.2471C10.8577 10.9042 10.4606 11.0623 9.91239 10.7566L5.23515 7.30226C5.21701 7.28924 5.20224 7.2721 5.19204 7.25224C5.18185 7.23238 5.17653 7.21037 5.17653 7.18805C5.17653 7.16573 5.18185 7.14372 5.19204 7.12386C5.20224 7.104 5.21701 7.08686 5.23515 7.07384L10.6363 2.1963C10.8823 1.97843 10.5836 1.873 10.2603 2.06979L3.48163 6.34643C3.46107 6.35984 3.43773 6.36839 3.41337 6.37143C3.38902 6.37448 3.36429 6.37193 3.34106 6.364L0.463032 5.45385C-0.176531 5.26761 -0.176531 4.82835 0.607109 4.51559L12.1227 0.0737957C12.2141 0.0299825 12.3132 0.00489115 12.4144 0Z" fill="white"/>
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
    border-radius: 50%;
}
</style>