<template>
    <div class="dropdown" :class="dropdownClasses" @click="handleDropdownClick">
        <div class="selected-item">
            <span v-if="selected && selected.icon" class="icon">
                <img :src="selected.icon" alt="Icon" />
            </span>
            <span v-if="selected && selected.icon_component" class="icon-component">
                <component :is=selected.icon_component v-bind:size="'32'":custom-color="selected.icon_component_custom_color"></component>
            </span>
            <span>
                {{ selected ? selected.label : placeholder }}
            </span>
        </div>
        <ArrowDownIcon class="chevron" :class="chevronClasses" size="24" />
        <div v-if="isOpen" class="dropdown-menu">
            <div class="dropdown-content">
                <div
                    v-for="item in items"
                    :key="item.value"
                    class="dropdown-item"
                    :class="{ 'dropdown-item--selected': isItemSelected(item) }"
                    @click.stop="handleItemClick(item)"
                >
                    <span v-if="item.icon" class="icon">
                        <img :src="item.icon" alt="Icon" />
                    </span>
                    <span v-if="item.icon_component" class="icon-component">
                        <component :is="item.icon_component" v-bind:size="'32'":custom-color="item.icon_component_custom_color"></component>
                    </span>
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed, type PropType } from 'vue';
import type { DropdownItem } from '@/types/components/dropdown';
import ArrowDownIcon from '@/assets/icons/arrows/ArrowDownIcon.vue';
import LanguageIcon from '@/assets/icons/languages/LanguageIcon.vue';
import WordsIcon from '@/assets/icons/vocabulary/WordsIcon.vue';
import MasteredStatusIcon from '@/assets/icons/vocabulary/status/MasteredStatusIcon.vue';
import Inactive1StatusIcon from '@/assets/icons/vocabulary/status/Inactive1StatusIcon.vue';
import ActiveStatusIcon from '@/assets/icons/vocabulary/status/ActiveStatusIcon.vue';

export default {
    components: { ArrowDownIcon, LanguageIcon, WordsIcon, Inactive1StatusIcon, ActiveStatusIcon, MasteredStatusIcon },
    props: {
        items: {
            type: Array as PropType<DropdownItem[]>,
            required: true,
        },
        modelValue: {
            type: [String, Number] as PropType<string | number | null>,
            default: null,
        },
        placeholder: {
            type: String,
            default: 'Select an item',
        },
        default_item: {
            type: Object as PropType<DropdownItem>,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const isOpen = ref(false);
        const selected = computed<DropdownItem | undefined>(() => {
            if (props.default_item) props.items.push(props.default_item);
            return props.items.find((item) => item.value === props.modelValue);
        });

        const handleDropdownClick = () => {
            if (!props.disabled) {
                toggleDropdown();
            }
        };

        const toggleDropdown = () => {
            isOpen.value = !isOpen.value;
        };

        const handleItemClick = (item: DropdownItem) => {
            if (!props.disabled) {
                selectItem(item);
            }
        };

        const selectItem = (item: DropdownItem) => {
            emit('update:modelValue', item.value);
            isOpen.value = false;
        };

        const isItemSelected = (item: DropdownItem) => {
            return selected.value && item.value === selected.value.value;
        };

        const chevronClasses = computed(() => ({
            'chevron--up': isOpen.value,
            'chevron--down': !isOpen.value,
        }));

        const dropdownClasses = computed(() => ({
            'dropdown--disabled': props.disabled,
        }));

        return {
            isOpen,
            selected,
            handleDropdownClick,
            handleItemClick,
            isItemSelected,
            chevronClasses,
            dropdownClasses,
        };
    },
};
</script>

<style lang="scss" scoped>
.dropdown {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 1.6rem;
    align-items: center;
    min-height: 5.6rem;
    max-width: 30rem;
    border-radius: $radius-md;
    padding-inline: 2rem;
    border: 0.1rem solid $neutrals-400;
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 500;
    color: $neutrals-900;
    background-color: $neutrals-100;
    box-sizing: border-box;

    @include hover {
        border-color: $primary-300;
        box-shadow: 0 0 0 0rem $primary-300;
    }

    &--disabled {
        background-color: $neutrals-200;
        border-color: $neutrals-400;
        color: $neutrals-600;
        cursor: not-allowed;
    }
}

.dropdown-content {
    display: flex;
    flex-direction: column;
    max-height: 35rem;
}

.selected-item {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2rem;
    display: flex;
    align-items: center;
}

.dropdown-menu {
    position: absolute;
    top: 105%;
    left: 0;
    background: white;
    box-shadow:
        0px 0px 8px 0px #11111a1a,
        0px 1px 0px 0px #11111a0d;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    border-radius: $radius-xs;
    max-height: 35rem;
    overflow-y: auto;
    z-index: 1000;
}

.dropdown-item {
    padding: 1.6rem 1.6rem;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2rem;
    display: flex;
    align-items: center;

    &:hover {
        background-color: $primary-200;
    }

    &--selected {
        background-color: $primary-400;
    }
}

.icon {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 1.2rem;
}

.icon-component {
    margin-right: 0.8rem;
}

.chevron {
    @include square(2.4rem);
    transition: all 0.3s ease;
    
    &--down {
        transform: rotateX(180deg);
    }

    &--up {
        transform: rotateX(0deg);
    }
}
</style>
