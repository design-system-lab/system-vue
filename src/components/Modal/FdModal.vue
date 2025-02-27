<template>
  <div
    v-if="visible"
    ref="modal"
    class="fd-modal"
    @keydown.tab.exact="handleTab"
    @keydown.tab.shift="handleTabShift"
  >
    <div
      class="fd-modal__overlay"
      @click.stop="dismissible && $emit('close')"
    >
      <div class="fd-modal__row row">
        <div
          class="fd-modal__container"
          :class="[`col-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl} align-items-${align}`]"
        >
          <div
            class="fd-modal__panel"
            @click.stop
          >
            <div
              v-if="dismissible"
              class="fd-modal__close"
            >
              <fd-close-button
                size="lg"
                @click="$emit('close')"
              />
            </div>
            <slot>
              <h1 class="fd-modal__title">
                <slot name="title" />
              </h1>
              <div class="fd-modal__content">
                <slot name="content" />
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, shallowRef, watch, PropType } from 'vue';
import FdCloseButton from '../CloseButton';

/**
 * Modal component
 * 
 * @param {String} align - vertical position (anchored to top, bottom, or centered)
 * @param {Boolean} dismissible - whether the modal can be dismissed by clicking outside of it
 * @param {Number} lg - number of columns to span at large screen sizes
 * @param {Number} md - number of columns to span at medium screen sizes
 * @param {Number} sm - number of columns to span at small screen sizes
 * @param {Boolean} visible - whether the modal is visible
 * @param {Number} xl - number of columns to span at extra large screen sizes
 * @param {Number} xs - number of columns to span at extra small screen sizes
 */
export default defineComponent({
  name: 'FdModal',
  components: {
    FdCloseButton,
  },
  props: {
    align: {
      type: String as PropType<'start' | 'center' | 'end'>,
      default: 'center',
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    lg: {
      type: Number,
      default: 4,
    },
    md: {
      type: Number,
      default: 6,
    },
    sm: {
      type: Number,
      default: 8,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    xl: {
      type: Number,
      default: 3,
    },
    xs: {
      type: Number,
      default: 12,
    },
  },
  setup(props) {
    const firstFocusableElement = shallowRef<HTMLElement>();
    const focusableContent = shallowRef<NodeListOf<Element>>();
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const lastFocusableElement = shallowRef<HTMLElement>();
    const modal = shallowRef<HTMLDivElement>();
    const previouslyFocusedElement = shallowRef<HTMLElement | null>(null);

    // Set up focus trap and focus on first focusable element
    function initCaptureFocus() {
      const modalElement = modal.value;

      focusableContent.value = modalElement?.querySelectorAll(focusableElements);
      firstFocusableElement.value = focusableContent.value?.[0] as HTMLElement;
      lastFocusableElement.value = focusableContent.value?.[focusableContent.value.length - 1] as HTMLElement;

      firstFocusableElement.value?.focus();
    }

    // Ensure focus is trapped within modal while tabbing
    function handleTab(e: KeyboardEvent) {
      if (document.activeElement === lastFocusableElement.value) {
        firstFocusableElement.value?.focus();
        e.preventDefault();
      }
    }

    // Ensure focus is trapped within modal while shift-tabbing
    function handleTabShift(e: KeyboardEvent) {
      if (document.activeElement === firstFocusableElement.value) {
        lastFocusableElement.value?.focus();
        e.preventDefault();
      }
    }

    // Watch for modal visibility, then inititate focus trap when visible
    watch(() => props.visible, (newValue) => {
      if (newValue) {
        previouslyFocusedElement.value = document.activeElement as HTMLElement;
        nextTick(() => {
          initCaptureFocus();
        });
      } else {
        previouslyFocusedElement.value?.focus();
      }
    });

    return {
      handleTab,
      handleTabShift,
      modal,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/required";

.fd-modal {
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999;

  &__overlay {
    background-color: rgba(var(--fora_modal_overlay_bg));
    height: 100%;
    width: 100%;
  }

  &__row {
    align-items: center;
    height: 100%;
    justify-content: center;
  }

  &__container {
    height: calc(100vh - ($modal_container_padding * 2));
    position: relative;
  }

  &__panel {
    background-color: rgba(var(--fora_modal_panel_bg));
    border-radius: $border-radius_lg;
    box-shadow: $shadow-xl;
    margin: 0 $modal_panel_margin;
    max-height: 100%;
    padding: $modal_panel_padding;
    position: relative;
    overflow: auto;
    z-index: 9999;
  }

  &__title {
    color: rgba(var(--fora_modal_title_color));
    font-size: $modal_title_size;
    font-weight: $modal_title_weight;
    line-height: $modal_title_line-height;
    margin-bottom: $modal_title_margin-bottom;
  }

  &__content {
    color: rgba(var(--fora_modal_content_color));
    font-size: $modal_content_size;
  }

  &__close {
    position: absolute;
    right: $modal_close_right;
    top: $modal_close_top;
  }
}
</style>