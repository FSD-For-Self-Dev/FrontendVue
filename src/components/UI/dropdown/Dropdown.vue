<script lang="ts">
import { ref, computed, type PropType } from 'vue';
import type { DropdownItem } from '@/types/components/dropdown';

export default {
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

<template>
    <div class="dropdown" :class="dropdownClasses" @click="handleDropdownClick">
        <div class="selected-item">
            <span v-if="selected && selected.icon" class="icon-container">
                <img :src="selected.icon" alt="Icon" style="width: 100%; height: 100%" />
            </span>
            <svg-icon v-if="selected && selected.icon_component" v-bind:name="selected.icon_component":color="selected.icon_component_custom_color" size="nm" />
            <span>
                {{ selected ? selected.label : placeholder }}
            </span>
        </div>
        <svg-icon class="chevron" :class="chevronClasses" name="ArrowDownIcon" size="md" />
        <div v-if="isOpen" class="dropdown-menu">
            <div class="dropdown-content">
                <div
                    v-for="item in items"
                    :key="item.value"
                    class="dropdown-item"
                    :class="{ 'dropdown-item--selected': isItemSelected(item) }"
                    @click.stop="handleItemClick(item)"
                >
                    <span v-if="item.icon" class="icon-container">
                        <img :src="item.icon" alt="Icon" style="width: 100%; height: 100%" />
                    </span>
                    <svg-icon v-if="item.icon_component" v-bind:name="item.icon_component":color="item.icon_component_custom_color" size="nm" />
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

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
    background-color: $neutrals-100;
    box-sizing: border-box;

    @include hover {
        border-color: $primary-300;
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
    @include text-2;
    color: $neutrals-900;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.dropdown-menu {
    position: absolute;
    top: 105%;
    left: 0;
    background: white;
    box-shadow: $regular-shadow;
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
    @include text-2;
    color: $neutrals-900;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    &:hover {
        background-color: $primary-200;
    }

    &--selected {
        background-color: $primary-400;
    }
}

.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.8rem;
    height: 2.8rem;
    padding: 0.4rem;
}

.chevron {
    @include square(2.4rem);
    transition: all 0.3s ease;
    
    &--up {
        transform: rotateX(180deg);
    }

}
</style>
