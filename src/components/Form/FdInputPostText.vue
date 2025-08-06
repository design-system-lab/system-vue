<script lang="ts" setup>
import { shallowRef } from 'vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid';
import FdIcon from '../Icon';
import { getIconSize, slideInOutContent, swapContent } from '../../utils';
import type { InputPostTextProps } from '../../types';

/**
 * Post text (error and assistive text) for input fields
 * 
 * @param {string} assistiveText - Text that appears beneath the input field intended to give additional context
 * @param {array} errors - The keys of the error messages for the errors that are in effect
 * @param {ErrorMessages} errorMessages - key:value pairs for possible errors, where the value is the error message displayed
 * @param {string} id - Id for the input, used to correlate the label, hint text, and error message
 * @param {boolean} persistentAssistiveText - Whether to show the assistive text while displaying errors
 */

const props = withDefaults(defineProps<InputPostTextProps>(), {
  errors: () => [],
  errorMessages: () => ({}),
  persistentAssistiveText: false,
});
  
const postText = shallowRef<HTMLDivElement | null>(null);

function onBeforeEnter(el: HTMLElement) {
  if (props.persistentAssistiveText || !props.assistiveText){
    slideInOutContent('before-enter', el);
  } else {
    swapContent('before-enter', el, postText.value);
  }
}

function onEnter(el: HTMLElement) {
  if (props.persistentAssistiveText || !props.assistiveText){
    slideInOutContent('enter', el);
  } else {
    swapContent('enter', el, postText.value);
  }
}

function onAfterEnter(el: HTMLElement) {
  if (props.persistentAssistiveText || !props.assistiveText){
    slideInOutContent('after-enter', el);
  } else {
    swapContent('after-enter', el, postText.value);
  }
}

function onBeforeLeave(el: HTMLElement) {
  if (props.persistentAssistiveText || !props.assistiveText){
    slideInOutContent('before-leave', el);
  } else {
    swapContent('before-leave', el, postText.value);
  }
}

function onLeave(el: HTMLElement) {
  if (props.persistentAssistiveText || !props.assistiveText){
    slideInOutContent('leave', el);
  } else {
    swapContent('leave', el, postText.value);
  }
}

function onAfterLeave(el: HTMLElement) {
  if (props.persistentAssistiveText || !props.assistiveText){
    slideInOutContent('after-leave', el);
  } else {
    swapContent('after-leave', el, postText.value);
  }
}
</script>

<template>
  <div
    ref="postText"
    class="fd-input-post-text"
    :class="{
      'fd-input-post-text--persistent-assistive': persistentAssistiveText
    }"
  >
    <transition
      v-if="!persistentAssistiveText && (assistiveText || $slots['assistive-text'])"
      @before-enter="(el) => onBeforeEnter(el as HTMLElement)"
      @enter="(el) => onEnter(el as HTMLElement)"
      @after-enter="(el) => onAfterEnter(el as HTMLElement)"
      @before-leave="(el) => onBeforeLeave(el as HTMLElement)"
      @leave="(el) => onLeave(el as HTMLElement)"
      @after-leave="(el) => onAfterLeave(el as HTMLElement)"
    >
      <div
        v-if="errors.length || $slots['error-text']"
        class="fd-input-post-text__errors"
      >
        <div
          :id="id && `${id}__error-text`"
          class="fd-input-post-text__errors-text"
        >
          <fd-icon
            class="fd-input-post-text__error-icon test"
            :icon="ExclamationTriangleIcon"
            :size="getIconSize('sm')"
          />
          <div>
            <slot name="error-text">
              <span
                v-for="(error, index) in errors"
                class="fd-input-post-text__error"
                :key="index"
              >
                {{ errorMessages[error] }}
              </span>
            </slot>
          </div>
        </div>
      </div>
      <div
        v-else
        class="fd-input-post-text__assistive"
      >
        <div
          :id="id && `${id}__assistive-text`"
          class="fd-input-post-text__assistive-text"
        >
          <slot name="assistive-text">
            {{ assistiveText }}
          </slot>
        </div>
      </div>
    </transition>
    <transition-group
      v-else
      @before-enter="(el) => onBeforeEnter(el as HTMLElement)"
      @enter="(el) => onEnter(el as HTMLElement)"
      @after-enter="(el) => onAfterEnter(el as HTMLElement)"
      @before-leave="(el) => onBeforeLeave(el as HTMLElement)"
      @leave="(el) => onLeave(el as HTMLElement)"
      @after-leave="(el) => onAfterLeave(el as HTMLElement)"
    >
      <div
        v-if="errors.length || $slots['error-text']"
        key="errors"
        class="fd-input-post-text__errors"
      >
        <div
          :id="id && `${id}__error-text`"
          class="fd-input-post-text__errors-text"
        >
          <fd-icon
            class="fd-input-post-text__error-icon test-2"
            :icon="ExclamationTriangleIcon"
            :size="getIconSize('sm')"
          />
          <div>
            <slot name="error-text">
              <span
                v-for="(error, index) in errors"
                class="fd-input-post-text__error"
                :key="index"
              >
                {{ errorMessages[error] }}
              </span>
            </slot>
          </div>
        </div>
      </div>
      <div
        v-if="assistiveText || $slots['assistive-text']"
        key="assistive"
        class="fd-input-post-text__assistive"
      >
        <div
          :id="id && `${id}__assistive-text`"
          class="fd-input-post-text__assistive-text"
        >
          <slot name="assistive-text">
            {{ assistiveText }}
          </slot>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-input-post-text {
  position: relative;
  width: 100%;

  &__assistive-text {
    color: rgb(var(--fora_form-field_assistive-text_color));
    font-size: $form-field_auxillary-text_size;
    font-weight: $form-field_auxillary-text_weight;
    line-height: 1.25rem;
    padding-top: $form-field_vertical_spacer;
  }

  &__errors-text {
    color: rgb(var(--fora_form-field_error-text_color));
    display: flex;
    font-size: $form-field_error-text_size;
    font-weight: $form-field_error-text_weight;
    line-height: 1.25rem;
    padding-top: $form-field_vertical_spacer;
    position: relative;
  }

  &__error-icon {
    flex: 0 0 auto;
    margin-right: 0.5rem;
  }

  &__error {
    display: block;
  }
}
</style>
