<template>
  <div
    class="fd-select"
    :class="{
      'fd-select--disabled': disabled,
      'fd-select--error': (errors.length || $slots['error-text']),
      'fd-input-fiel--focused': hasFocus,
      'fd-select--readonly': readonly,
      'fd-select--small': small,
    }"
  >
    <div
      v-if="label || $slots['label']"
      :id="`${id}__label`"
      class="fd-select__label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div
      ref="select"
      class="fd-select__input-field"
      :class="{
        'fd-select__input-field--disabled': disabled,
        'fd-select__input-field--error': (errors.length || $slots['error-text']),
        'fd-select__input-field--focused': hasFocus,
        'fd-select__input-field--focused-error': hasFocus && (errors.length || $slots['error-text']),
        'fd-select__input-field--readonly': readonly,
        'fd-select__input-field--small': small,
      }"
    >
      <div class="fd-select__input-container">
        <slot name="prepend-icon">
          <fd-icon
            v-if="prependIcon"
            class="fd-select__prepend-icon"
            :icon="prependIcon"
            :size="getIconSize('sm')"
          />
        </slot>
        <select
          ref="selectInput"
          class="fd-select__input"
          v-bind="inputAttrs"
          :aria-describedby="((errors.length || $slots['error-text']) && `${id}__error-text`) || describedby || ((assistiveText || $slots['assistive-text']) && `${id}__assistive-text`)"
          :aria-labelledby="labelledby || ((label || $slots['label']) && `${id}__label`)"
          :disabled="disabled"
          :readonly="readonly"
          :value="modelValue"
          @blur="handleBlur"
          @input="handleInput"
          @focus="hasFocus = true"
          @keydown.down="handleDown"
          @keydown.up="handleUp"
          @keydown.space.prevent="handleClick"
          @keydown.tab="handleTab"
          @mousedown.prevent="handleClick"
        >
          <option
            v-if="placeholder"
            disabled
            hidden
            selected
            value=""
          >
            {{ placeholder }}
          </option>
          <option
            v-for="item in items"
            :key="item.text || item.slotName"
            :value="item.value"
          >
            <slot :name="item.slotName">
              {{ item.text }}
            </slot>
          </option>
        </select>
        <fd-icon
          class="fd-select__append-icon"
          :icon="ChevronDownIcon"
          :size="getIconSize('sm')"
        />
      </div>
      <fd-menu
        v-if="menuOpen"
        class="fd-select__menu"
        :focus-item="focusedItem"
        :items="items"
        @blur="handleMenuBlur"
        @document-click="handleDocumentClick"
        @menu-click="handleMenuClick"
      >
        <template
          v-for="(_, name) in $slots"
          #[name]="slotData"
        >
          <slot
            v-bind="slotData"
            :name="name"
          />
        </template>
      </fd-menu>
    </div>
    <fd-input-post-text
      class="fd-select__post-text"
      :assistive-text="assistiveText"
      :error-messages="errorMessages"
      :errors="errors"
      :id="id"
      :persistent-assistive-text="persistentAssistiveText"
    >
      <template
        v-for="(_, name) in filterSlots($slots, ['error-text', 'assistive-text'])"
        #[name]="slotData"
      >
        <slot
          v-bind="slotData"
          :name="name"
        />
      </template>
    </fd-input-post-text>
  </div>
</template>
<script lang="ts">
import { defineComponent, shallowRef, watch, PropType } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import FdIcon from '../Icon';
import FdInputPostText from './FdInputPostText.vue';
import FdMenu from '../Menu';
import { getIconSize } from '../../utils/icons';
import { filterSlots } from '../../utils/components';
import { Icon, ErrorMessages } from '../../types/common';
import { SelectOption } from '../../types/forms';

/**
 * Input Field
 * 
 * @param {string} assistiveText - Text that appears beneath the input field intended to give additional context
 * @param {string} describedby - Optional. When using descriptive text for the input outside of the component, supply this prop with the id of the descriptive text element
 * @param {boolean} disabled - Whether the component is disabled
 * @param {array} errors - The keys of the error messages for the errors that are in effect
 * @param {ErrorMessages} errorMessages - Key:value pairs for possible errors, where the value is the error message displayed
 * @param {string} id - Required id for the input, used to correlate the label, hint text, and error message
 * @param {object} inputAttrs - An object of key:value pairs for attributes to add to the html input element
 * @param {string} label - The label for the input field
 * @param {string} labelledby - Optional. When using a label outside of the component, supply this prop with the id of the label element
 * @param {string} modelValue - The value of the input
 * @param {boolean} persistentAssistiveText - Whether to show the assistive text while displaying errors
 * @param {string} placeholder - Placeholder text for the input
 * @param {Icon} prependIcon - An icon component to use within FdIcon, comes before the text within the input field
 * @param {boolean} readonly - Whether the field should be set to readonly mode
 * @param {boolean} small - Whether to render the field in small mode
 * @param {string} type - The HTML attribute type value to set on the input element, (e.g. 'text', 'number', etc.)
 */
export default defineComponent({
  name: 'FdSelect',
  components: {
    FdIcon,
    FdInputPostText,
    FdMenu,
  },
  props: {
    appendIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    assistiveText: {
      type: String,
      default: undefined,
    },
    describedby: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    errorMessages: {
      type: Object as PropType<ErrorMessages>,
      default: () => ({}),
    },
    id: {
      type: String,
      required: true,
    },
    inputAttrs: {
      type: Object as PropType<{[key: string]: string}>,
      default: () => ({}),
    },
    label: {
      type: String,
      default: undefined,
    },
    labelledby: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    persistentAssistiveText: {
      type: Boolean,
      default: false,
    },  
    placeholder: {
      type: String,
      default: undefined,
    },
    prependIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 7,
    },
    small: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const focusedItem = shallowRef(0);
    const hasFocus = shallowRef(false);
    const menuOpen = shallowRef(false);
    const select = shallowRef<HTMLDivElement | null>(null);
    const selectInput = shallowRef<HTMLSelectElement | null>(null);

    /**
     * Handles the input event and emits the input value
     * 
     * @prop {object} e The HTML InputEvent from the input
     */
    function handleInput(e: Event) {
      emit('update:modelValue', [(e.target as HTMLSelectElement)?.value]);
    }

    function handleMenuBlur() {
      selectInput.value.focus();
      menuOpen.value = false;
    }

    function handleBlur() {
      hasFocus.value = false;
      menuOpen.value = false;
    }

    function handleClick() {
      selectInput.value.focus();
      menuOpen.value = true;
    }

    function handleDocumentClick(e) {
      if (select.value && !select.value.contains(e.target)) {
        menuOpen.value = false;
      }
    }

    function handleUp() {
      if (focusedItem.value > 0) {
        focusedItem.value -= 1;
      }
    }

    function handleMenuClick() {
      selectInput.value.focus();
    }

    function handleDown() {
      if (focusedItem.value < props.items.length - 1) {
        focusedItem.value += 1;
      }
    }

    function handleTab(e: Event) {
      if (menuOpen.value) {
        e.preventDefault();
        menuOpen.value = false;
        selectInput.value.focus();
      }
    }

    // set initial focused item when menu is opened
    watch(
      menuOpen,
      (newVal) => {
        if (newVal) {
          if (props.modelValue.length) {
            focusedItem.value = props.items.findIndex((val) => val.value === props.modelValue[0]);
          } else {
            focusedItem.value = 0;
          }
        }
      },
    );

    return {
      ChevronDownIcon,
      filterSlots,
      focusedItem,
      getIconSize,
      handleBlur,
      handleClick,
      handleDocumentClick,
      handleDown,
      handleInput,
      handleMenuBlur,
      handleMenuClick,
      handleUp,
      handleTab,
      hasFocus,
      menuOpen,
      select,
      selectInput,
    };
  }
});
</script>
<style lang="scss" scoped>
@import "@/styles/required";

.fd-select {
  width: 100%;

  &__label {
    font-size: $form-field_label_size;
    font-weight: $form-field_label_weight;
    margin-bottom: $form-field_vertical_spacer;
  }

  &__prepend-icon {
    color: rgba(var(--fora_form-field_icon_color));
    margin-right: 0.625rem;
  }

  &__append-icon {
    color: rgba(var(--fora_form-field_icon_color));
    margin-left: 0.625rem;
  }

  &__input-field {
    background-color: rgba(var(--fora_form-field_input_bg));
    border: $form-field_border;
    border-color: rgba(var(--fora_form-field_border-color));
    border-radius: $form-field_border-radius;
    line-height: 1.25rem;
    padding: calc($form-field_padding - $form-field_border_size);
    position: relative;
    transition: border .35s ease, box-shadow .35s ease;
    z-index: 1;

    &--focused {
      @include focus-primary-styles;
      border-color: rgba(var(--fora_form-field_border-color--focus));
    }

    &:hover {
      border-color: rgba(var(--fora_form-field_border-color--hover));
    }

    &--small {
      padding-bottom: calc($form-field_sm_padding - $form-field_border_size);
      padding-top: calc($form-field_sm_padding - $form-field_border_size);
    }

    &--disabled:hover,
    &--readonly:hover {
      border-color: rgba(var(--fora_form-field_border-color));
    }

    &--readonly {
      background-color: rgba(var(--fora_form-field_readonly_bg));
    }

    &--error {
      border-color: rgba(var(--fora_form-field_error_border-color));

      &:hover {
        border-color: rgba(var(--fora_form-field_error_border-color--hover))
      }
    }

    &--focused-error {
      @include focus-danger-styles;
      border-color: rgba(var(--fora_form-field_error_border-color--focus));
    }

    &--disabled {
      background-color: rgba(var(--fora_form-field_disabled_bg));
      border-color: rgba(var(--fora_form-field_disabled_border-color));
      color: rgba(var(--fora_form-field_disabled_color));
    }
  }

  &__input-container {
    display: flex;
  }

  &__input {
    appearance: none;
    background: none;
    border: 0;
    font-size: $form-field_input_size;
    font-weight: $form-field_input_weight;
    line-height: $form-field_input_line-height;
    margin: 0;
    padding: 0;
    width: 100%;

    &:focus-visible {
      outline: none;
    }
  }

  &__menu {
    position: absolute;
    top: 100%;
  }
}
</style>
