<script lang="ts">
import { OnClickOutside } from '@vueuse/components';

export default {
    components: { OnClickOutside },
    data() {
        return {
            shownBar: false,
        };
    },
    methods: {
        showSearchBar(event: MouseEvent) {
            this.shownBar = true;
        },
        hideSearchBar() {
            this.shownBar = false;
        },
    },
};
</script>

<template>
    <button @click="showSearchBar">
        <svg-icon name="SearchIcon" size="lg" />
    </button>
    <div class="search">
        <OnClickOutside @trigger="hideSearchBar">
            <div class="searchbar" :class="{ shown: shownBar }">
                <div class="searchbar--input" />
            </div>
        </OnClickOutside>
    </div>

</template>

<style lang="scss">
.search {
    position: relative;
}

.searchbar {
    position: absolute;
    right: -0.4rem;
    top: -10rem;
    opacity: 0;
    padding: 0.4rem;
    transition:
        top 0.3s,
        opacity 0.3s ease-out;
    z-index: 100;
}

.searchbar--input {
    width: calc(56.4rem + 5.6rem + ((100vw - 116rem) / 2));
    max-width: 81.4rem;
    height: 5.6rem;
    border: 2px solid $primary-400;
    border-radius: $radius-lg;
    background-color: white;
}

.shown {
    top: -0.4rem;
    opacity: 1;
}
</style>