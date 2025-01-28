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
      @click="dismissible && $emit('close')"
    >
      <div class="row justify-content-center">
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
              <fd-close-button size="lg" @click="$emit('close')" />
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

export default defineComponent({
  name: 'FdModal',
  components: {
    FdCloseButton,
  },
  props: {
    // vertical position (anchored to top or centered)
    // column width
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
    xs: {
      type: Number,
      default: 12,
    },
    xl: {
      type: Number,
      default: 3,
    },
  },
  setup(props) {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = shallowRef<HTMLDivElement>();
    const previouslyFocusedElement = shallowRef<HTMLElement | null>(null);
    const focusableContent = shallowRef<NodeListOf<Element>>();
    const firstFocusableElement = shallowRef<HTMLElement>();
    const lastFocusableElement = shallowRef<HTMLElement>();

    function initCaptureFocus() {
      const modalElement = modal.value;

      focusableContent.value = modalElement?.querySelectorAll(focusableElements);
      firstFocusableElement.value = focusableContent.value?.[0] as HTMLElement;
      lastFocusableElement.value = focusableContent.value?.[focusableContent.value.length - 1] as HTMLElement;

      firstFocusableElement.value?.focus();
    };

    function handleTab(e: KeyboardEvent) {
      if (document.activeElement === lastFocusableElement.value) {
        firstFocusableElement.value?.focus();
        e.preventDefault();
      }
    };

    function handleTabShift(e: KeyboardEvent) {
      if (document.activeElement === firstFocusableElement.value) {
        lastFocusableElement.value?.focus();
        e.preventDefault();
      }
    };

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;

  &__overlay {
    align-items: center;
    display: flex;
    position: fixed;
    padding: 1rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--fora_black), 0.5);
  }

  &__container {
    height: calc(100vh - 3rem);
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    position: relative;
  }

  &__panel {
    background-color: rgb(var(--fora_white));
    border-radius: $border-radius_lg;
    box-shadow: $shadow-xl;
    max-height: calc(100vh - 3rem);
    padding: 1.5rem;
    position: relative;
    overflow: auto;
    z-index: 9999;
  }

  &__title {
    font-size: $heading-6;
    font-weight: $font-semi-bold;
    line-height: 1.75rem;
    margin-bottom: 1rem;
  }

  &__content {
    color: rgba(var(--fora_text_default), 1);
    font-size: $font-base;
  }

  &__close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
}
</style>