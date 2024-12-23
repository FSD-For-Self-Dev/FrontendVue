<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { IconButtonProps } from "@/types/components/icon-button.ts";

export default {
  props: {
    icon: {
      type: String as PropType<IconButtonProps["icon"]>,
      required: true,
    },
    iconSize: {
      type: String as PropType<IconButtonProps["iconSize"]>,
      required: false,
    },
    size: {
      type: String as PropType<IconButtonProps["size"]>,
      default: "md",
    },
    variant: {
      type: String as PropType<IconButtonProps["variant"]>,
      default: "secondary",
    },
    active: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    buttonClasses() {
      return {
        /* Sizes */
        "button--xxsmall": this.size === "xxs",
        "button--xsmall": this.size === "xs",
        "button--small": this.size === "sm",
        "button--medium": this.size === "md",
        "button--normal": this.size === "nm",
        "button--large": this.size === "lg",
        "button--xlarge": this.size === "xl",

        /* Variants */
        "button--primary": this.variant === "primary",
        "button--secondary": this.variant === "secondary",
        "button--tertiary": this.variant === "tertiary",
        "button--shadowed": this.variant === "shadowed",
        "button--lucid": this.variant === "lucid",
        "button--ghost": this.variant === "ghost",
        "button--favorite": this.variant === "favorite",
        "button--favorite-lucid": this.variant === "favorite-lucid",

        /* EXtra states */
        "active": this.active,
      };
    },
    iconSizeComputes() {
      if (this.iconSize) return this.iconSize;
      return this.size;
    },
  },
};
</script>

<template>
  <button class="button" :class="buttonClasses">
      <svg-icon :name="icon" :size="iconSizeComputes" id="icon" />
  </button>
</template>

<style lang="scss" scoped>
.button {
  @include flex-center;
  cursor: pointer;
  border-radius: $radius-full;
  align-self: center;

  &:disabled {
    cursor: not-allowed;
    background-color: $neutrals-300;
    outline: $neutrals-300 0.1rem solid;
    box-shadow: none;
  
    #icon {
      color: $neutrals-600;
    };
  }

  &--primary {
    background-color: $primary-500;

    #icon {
      color: $neutrals-100;
    };

    @include hover {
      background-color: $primary-600;
    }

    @include active {
      background-color: $primary-700;
    }

    @include focus {
      background-color: $primary-700;
    }

    &.active {
      background-color: $primary-700;
    }
  }

  &--secondary {
    background-color: $neutrals-100;
    outline: $neutrals-400 0.1rem solid;

    #icon {
      color: $neutrals-800;
    };

    @include hover {
      background-color: $primary-300;
      outline-color: $primary-300;

      #icon {
        color: $primary-700;
      };
    }

    &.active {
      background-color: $primary-400;
      outline-color: $primary-400;

      #icon {
        color: $primary-700;
      };
    }

    @include active {
      background-color: $primary-300;
      outline-color: $primary-300;

      #icon {
        color: $primary-700;
      };
    }
  }

  &--tertiary {
    background-color: transparent;

    #icon {
      color: $neutrals-600;
    };

    @include hover {
      background-color: $primary-100;

      #icon {
        color: $primary-500;
      };
      
    }

    @include active {
      background-color: $primary-500;

      #icon {
        color: $neutrals-100;
      };
    }

    @include focus {
      background-color: $primary-500;

      #icon {
        color: $neutrals-100;
      };
    }
  }

  &--shadowed {
    background-color: $neutrals-100;
    box-shadow: $regular-shadow;

    #icon {
      color: $neutrals-700;
    };

    @include hover {
      background-color: $primary-300;

      #icon {
        color: $primary-700;
      };
      
    }

    @include active {
      background-color: $primary-300;

      #icon {
        color: $primary-700;
      };
    }
  }

  &--lucid {
    background-color: $white-lucid;
    box-shadow: $regular-shadow;
    outline: $white-lucid 0.1rem solid;

    #icon {
      color: $neutrals-800;
    };

    @include hover {
      background-color: $primary-100;
      outline-color: $primary-100;
      
      #icon {
        color: $primary-700;
      };
    }

    @include active {
      background-color: $primary-400;
      outline-color: $primary-400;
      
      #icon {
        color: $primary-700;
      };
    }

    &.active {
      background-color: $primary-400;
      outline-color: $primary-400;

      #icon {
        color: $primary-700;
      };
    }
  }

  &--ghost {
    background-color: #ffffff30;
    box-shadow: $regular-shadow;

    #icon {
      color: $neutrals-100;
    };

    @include hover {
      background-color: #ffffff70;
      
      #icon {
        color: $primary-700;
      };
    }

    @include active {
      background-color: #ffffff80;
      
      #icon {
        color: $primary-700;
      };
    }

    @include focus {
      background-color: #ffffff80;
      outline-offset: -0.1rem;
      outline: $primary-500 0.1rem solid;
      
      #icon {
        color: $primary-700;
      };
    }
  }

  &--favorite {
    background-color: $neutrals-100;
    outline: $neutrals-400 0.1rem solid;

    #icon {
      color: $neutrals-800;
    };

    @include hover {
      background-color: $danger-100;
      outline-color: $danger-100;

      #icon {
        color: $danger-400;
      };
    }

    &.active {

      #icon {
        color: $danger-500;
      };
    }
  }

  &--favorite-lucid {
    background-color: $white-lucid;
    box-shadow: $regular-shadow;
    outline: $white-lucid 0.1rem solid;

    #icon {
      color: $neutrals-800;
    };

    @include hover {
      background-color: $danger-100;
      
      #icon {
        color: $danger-400;
      };
    }

    &.active {

      #icon {
        color: $danger-500;
      };
    }
  }
  
  &--xxsmall {
    width: 2.8rem;
    height: 2.8rem;
    min-width: 2.8rem;
    min-height: 2.8rem;
  }

  &--xsmall {
    width: 3.6rem;
    height: 3.6rem;
    min-width: 3.6rem;
    min-height: 3.6rem;
  }

  &--small {
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    min-height: 4rem;
  }

  &--medium {
    width: 4.4rem;
    height: 4.4rem;
    min-width: 4.4rem;
    min-height: 4.4rem;
  }

  &--normal {
    width: 4.8rem;
    height: 4.8rem;
    min-width: 4.8rem;
    min-height: 4.8rem;
  }

  &--large {
    width: 5.6rem;
    height: 5.6rem;
    min-width: 5.6rem;
    min-height: 5.6rem;
  }

  &--xlarge {
    width: 6.4rem;
    height: 6.4rem;
    min-width: 6.4rem;
    min-height: 6.4rem;
  }
}

</style>
