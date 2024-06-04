<template>
  <div
    class="fd-select"
    :class="{
      'fd-select--disabled': disabled,
      'fd-select--error': (errors.length || $slots['error-text']),
      'fd-select--focused': hasFocus,
      'fd-select--readonly': readonly,
      'fd-select--small': small,
    }"
  >
    <label
      v-if="label || $slots['label']"
      :id="`${id}__label`"
      class="fd-select__label"
      :for="`${id}__input`"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div
      ref="select"
      class="fd-select__input-menu-container"
    >
      <div
        class="fd-select__input-field"
        :class="{
          'fd-select__input-field--disabled': disabled,
          'fd-select__input-field--error': (errors.length || $slots['error-text']),
          'fd-select__input-field--focused': hasFocus,
          'fd-select__input-field--focused-error': hasFocus && (errors.length || $slots['error-text']),
          'fd-select__input-field--readonly': readonly,
          'fd-select__input-field--small': small,
        }"
        @click="handleClick"
      >
        <div
          class="fd-select__input-container"
        >
          <fd-icon
            v-if="getPrependIcon || $slots['prepend-icon']"
            class="fd-select__prepend-icon"
            :icon="getPrependIcon"
            :size="getIconSize('sm')"
          >
            <slot name="prepend-icon" />
          </fd-icon>
          <select
            ref="selectInput"
            :id="`${id}__input`"
            class="fd-select__input"
            v-bind="inputAttrs"
            :aria-describedby="((errors.length || $slots['error-text']) && `${id}__error-text`) || describedby || ((assistiveText || $slots['assistive-text']) && `${id}__assistive-text`)"
            :aria-labelledby="labelledby || ((label || $slots['label']) && `${id}__label`)"
            :disabled="disabled"
            :multiple="multiple"
            :readonly="readonly"
            :title="activeItems.map(a => a.text).join(', ')"
            :value="modelValue"
            @blur="handleBlur"
            @input="handleInput"
            @focus="hasFocus = true"
            @keydown.down.exact.prevent="handleDown"
            @keydown.down.meta.exact.prevent="handleDownCtrl"
            @keydown.down.shift.exact.prevent="handleDownShift"
            @keydown.enter="handleEnter"
            @keydown.up.exact.prevent="handleUp"
            @keydown.up.meta.exact.prevent="handleUpCtrl"
            @keydown.up.shift.exact.prevent="handleUpShift"
            @keydown.space.prevent="handleSpace"
            @keydown.tab="handleTab"
            @mousedown.prevent
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
          <div
            class="fd-select__faux-input"
            :inert="chips ? false : true"
          >
            <fd-field-value
              v-bind="{ chips, chipsInteractive, csv, modelValue: activeItems, multiple}"
              @item:click="handleFieldItemClick"
              @item:dismiss="handleFieldItemDismiss"
            >
              <template #placeholder>
                <slot name="placeholder">
                  {{ placeholder }}
                </slot>
              </template>
            </fd-field-value>
          </div>
          <fd-icon
            class="fd-select__append-icon"
            :class="{
              'fd-select__append-icon--open': menuOpen,
            }"
            :icon="ChevronDownIcon"
            :size="getIconSize('sm')"
            inert
          />
        </div>
      </div>
      <fd-menu
        v-if="menuOpen"
        ref="menu"
        class="fd-select__menu"
        v-bind="{ checkboxEnd, direction, focusItem: focusedItem, items, menuPlacement, modelValue, multiple, parent: select, size, small, width: menuWidth }"
        @document:click="handleDocumentClick"
        @item:click="handleMenuItemClick"
        @menu:click="handleMenuClick"
        @tab="handleMenuTab"
      >
        <template
          v-for="(_, name) in ($slots as Record<string, Function>)"
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
import { computed, defineComponent, inject, shallowRef, watch, PropType, ComponentPublicInstance } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import FdFieldValue from './FdSelectValue.vue';
import FdIcon from '../Icon';
import FdInputPostText from './FdInputPostText.vue';
import FdMenu from '../Menu';
import { filterSlots, getIconSize } from '../../utils';
import { ErrorMessages, Icon, MenuDirection, MenuPlacement, NodeOrNull, SelectOption } from '../../types';

/**
 * Input Field
 * 
 * @param {string} assistiveText - Text that appears beneath the input field intended to give additional context
 * @param {boolean} checkboxEnd - Whether the checkbox should appear at the end of the input field
 * @param {boolean} chips - Whether multiple inputs should be displayed as chips in the field
 * @param {boolean} chipsInteractive - Whether the chips should be interactive (clickable)
 * @param {boolean} csv - Whether to display the selected items as a comma-separated list
 * @param {string} describedby - Optional. When using descriptive text for the input outside of the component, supply this prop with the id of the descriptive text element
 * @param {boolean} disabled - Whether the component is disabled
 * @param {MenuDirection} direction - Either 'top' or 'bottom', defaults to 'bottom'
 * @param {boolean} displaySelectionIcon - For single selection, will cause the selection icon to appear in the prepend icon area
 * @param {array} errors - The keys of the error messages for the errors that are in effect
 * @param {ErrorMessages} errorMessages - Key:value pairs for possible errors, where the value is the error message displayed
 * @param {string} id - Required id for the input, used to correlate the label, hint text, and error message
 * @param {object} inputAttrs - An object of key:value pairs for attributes to add to the html input element
 * @param {array} items - Array of objects representing the options for the select 
 * @param {string} label - The label for the input field
 * @param {string} labelledby - Optional. When using a label outside of the component, supply this prop with the id of the label element
 * @param {MenuPlacement} menuPlacement - Whether the menu should be appear inline or above all content
 * @param {string} menuWidth - A CSS value for the width of the menu, defaults to width of select field
 * @param {array} modelValue - Array of strings representing the values of the selected items
 * @param {boolean} multiple - Whether to allow multiple items to be selected
 * @param {boolean} persistentAssistiveText - Whether to show the assistive text while displaying errors
 * @param {string} placeholder - Placeholder text for the input
 * @param {Icon} prependIcon - An icon component to use within FdIcon, comes before the text within the input field
 * @param {boolean} readonly - Whether the field should be set to readonly mode
 * @param {number} size - The number of items to display in the menu before scrolling
 * @param {boolean} small - Whether to render the field in small mode
 */
export default defineComponent({
  name: 'FdSelect',
  components: {
    FdFieldValue,
    FdIcon,
    FdInputPostText,
    FdMenu,
  },
  props: {
    assistiveText: {
      type: String,
      default: undefined,
    },
    checkboxEnd: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    chipsInteractive: {
      type: Boolean,
      default: false,
    },
    csv: {
      type: Boolean,
      default: false,
    },
    describedby: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String as PropType<MenuDirection>,
      default: 'bottom',
    },
    displaySelectionIcon: {
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
    items: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    label: {
      type: String,
      default: undefined,
    },
    labelledby: {
      type: String,
      default: undefined,
    },
    menuPlacement: {
      type: String as PropType<MenuPlacement>,
      default: 'attached',
    },
    menuWidth: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
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
  },
  emits: ['item:click', 'update:modelValue'],
  setup(props, { emit }) {
    const focusedItem = shallowRef(-1);
    const focusStart = shallowRef(-1);
    const hasFocus = shallowRef(false);
    const menu = shallowRef<ComponentPublicInstance | null>(null);
    const menuOpen = shallowRef(false);
    const select = shallowRef<HTMLDivElement | null>(null);
    const selectInput = shallowRef<HTMLSelectElement | null>(null);

    const activeItems = computed((): SelectOption[] => {
      return props.items.filter(item => props.modelValue.includes(item.value));
    });

    const getPrependIcon = computed((): Icon | undefined => {
      const selectedItemIcon: Icon | undefined = activeItems.value.length ? activeItems.value[0].icon : undefined;

      if (!props.multiple && props.displaySelectionIcon && selectedItemIcon) {
        return selectedItemIcon;
      }

      return props.prependIcon;
    })
    
    /**
     * Returns the updated array after adding or removing the value provided, only for multiple select
     * 
     * @param value Item value to add or remove from the modelValue array
     */
    function getMultipleValue(value: string): string[] {
      if (props.modelValue.includes(value)) {
        return props.modelValue.filter((val) => val !== value);
      }

      return [...props.modelValue, value];
    }

    /**
     * Handling select element blur: make sure that blur isn't registered if they've clicked inside the faux menu
     * 
     * @param {FocusEvent} e The event emitted from blur
     */
    function handleBlur(e: FocusEvent) {
      console.log('blur')
      if (!menu.value?.$el.contains(e.relatedTarget as NodeOrNull)) {
        hasFocus.value = false;
        menuOpen.value = false;
      } else {
        // although this is also handled in handleClick, we do it here too for insurance
        selectInput.value?.focus();
      }
    }

    /**
     * What to do when the select field is clicked, or the spacebar is pressed while select is focused
     * Focus the select field, then open/close the menu (unless it's readonly or disabled)
     */
    function handleClick(e: Event) {
      console.log('click')
      selectInput.value?.focus();

      if (!props.readonly && !props.disabled) {
        if (props.multiple && menu.value?.$el.contains(e.target as NodeOrNull)) {
          return;
        }

        menuOpen.value = !menuOpen.value;
      }
    }

    /**
     * Handles the input event and emits the input value
     * 
     * @prop {object} e The HTML InputEvent from the input
     */
    function handleInput(e: Event) {
      if (props.readonly || props.disabled) return;

      const target = (e.target as HTMLSelectElement);

      focusedItem.value = props.items.findIndex((val) => val.value === target?.value);
      focusStart.value = focusedItem.value;
      emit('update:modelValue', props.multiple ? getMultipleValue(target.value) : [target?.value]);
    }

    /**
     * Change the focused item when the user presses down arrow
     */
    function handleDown() {
      if (focusedItem.value < props.items.length - 1) {
        focusedItem.value += 1;
        focusStart.value = focusedItem.value;
        emit('update:modelValue', [props.items[focusedItem.value].value]);
      }
    }

    function handleDownCtrl() {
      if (focusedItem.value < props.items.length - 1) {
        focusedItem.value += 1;
        focusStart.value = focusedItem.value;
      }
    }

    function handleDownShift() {
      if (props.multiple && focusedItem.value < props.items.length - 1) {
        if (focusStart.value === focusedItem.value) {
          emit('update:modelValue', [
            props.items[focusedItem.value].value, 
            props.items[focusedItem.value + 1].value,
          ]);

          focusedItem.value += 1;
        } else {
          focusedItem.value += 1;

          emit('update:modelValue', getMultipleValue(
            focusStart.value < focusedItem.value
              ? props.items[focusedItem.value].value
              : props.items[focusedItem.value - 1].value,
          ));
        }
      }
    }

    /**
     * Change the focused item when the user presses up arrow
     */
    function handleUp() {
      if (focusedItem.value > 0) {
        focusedItem.value -= 1;
        focusStart.value = focusedItem.value;
        emit('update:modelValue', [props.items[focusedItem.value].value]);
      }
    }

    function handleUpCtrl() {
      console.log('ctrl')
      if (focusedItem.value > 0) {
        focusedItem.value -= 1;
        focusStart.value = focusedItem.value;
      }
    }

    function handleUpShift() {
      if (props.multiple && focusedItem.value > 0) {
        if (focusStart.value === focusedItem.value) {
          emit('update:modelValue', [
            props.items[focusedItem.value].value, 
            props.items[focusedItem.value - 1].value,
          ]);

          focusedItem.value -= 1;
        } else {
          focusedItem.value -= 1;

          emit('update:modelValue', getMultipleValue(
            focusStart.value > focusedItem.value
              ? props.items[focusedItem.value].value
              : props.items[focusedItem.value + 1].value,
          ));
        }
      }
    }

    /**
     * If the menu is open, close it when the user presses enter
     */
    function handleEnter(e: KeyboardEvent) {
      e.preventDefault();

      if (menuOpen.value) {
        menuOpen.value = false;
      }
    }

    function handleSpace(e: KeyboardEvent) {
      if (!props.multiple) {
        handleClick(e);
      } else {
        if (menuOpen.value && focusedItem.value !== -1) {
          emit('update:modelValue', getMultipleValue(props.items[focusedItem.value].value));
        } else {
          menuOpen.value = !menuOpen.value;
        }
      }
    }

    /**
     * If the menu is open, prevent tabbing, and close the menu to emulate default select functionality
     */
    function handleTab(e: Event) {
      if (menuOpen.value) {
        e.preventDefault();
        menuOpen.value = false;
        selectInput.value?.focus();
      }
    }

    /**
     * If a user happens to click part of the menu, but not a button, send the focus back to the select input
     */
    function handleMenuClick() {
      selectInput.value?.focus();
    }

    /**
     * Handle a menu item click:
     * Set the focus to that item, update the modelValue, close the menu, and set the focus back to the select input
     */
    function handleMenuItemClick(val: string) {
      focusedItem.value = props.items.findIndex((item) => item.value === val);
      focusStart.value = focusedItem.value;
      emit('update:modelValue', props.multiple ? getMultipleValue(val) : [val]);
      menuOpen.value = props.multiple ? true : false;
      selectInput.value?.focus();
    }

    /**
     * If somehow we focus and tab on a menu item, send it back to the select
     */
    function handleMenuTab() {
      selectInput.value?.focus();
      menuOpen.value = false;
    }

    /**
     * Handles an interactive chip click
     * 
     * @param item The item that was clicked in the field - only applicable for chips
     */
    function handleFieldItemClick(item: SelectOption) {
      emit('item:click', item);
    }

    /**
     * Removes the dismissed item from the modelValue array
     * 
     * @param item The item that was dismissed in the field - only applicable for chips
     */
    function handleFieldItemDismiss(item: SelectOption) {
      emit('update:modelValue', getMultipleValue(item.value));
    }

    /**
     * We check to see if the document click happened in a child of the select or menu, if not close the menu
     */
    function handleDocumentClick(e: Event) {
      if (!select.value?.contains(e.target as NodeOrNull) && !menu.value?.$el.contains(e.target as NodeOrNull)) {
        menuOpen.value = false;
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
            focusedItem.value = -1;
          }

          focusStart.value = focusedItem.value;
        }
      },
    );

    return {
      activeItems,
      ChevronDownIcon,
      filterSlots,
      focusedItem,
      getIconSize,
      getPrependIcon,
      handleBlur,
      handleClick,
      handleDocumentClick,
      handleDown,
      handleDownCtrl,
      handleDownShift,
      handleEnter,
      handleFieldItemClick,
      handleFieldItemDismiss,
      handleInput,
      handleMenuItemClick,
      handleMenuTab,
      handleMenuClick,
      handleSpace,
      handleUp,
      handleUpCtrl,
      handleUpShift,
      handleTab,
      hasFocus,
      menu,
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
  @include form-field-common;

  &__append-icon {
    margin-left: auto;
    transition: $transition-timing transform;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__input {
    appearance: none; // necessary for safari
    cursor: pointer;
    height: 100%;
    left: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    opacity: 0;
    width: 100%;

    &:focus-visible {
      outline: none;
    }

    &:disabled {
      cursor: default;
    }
  }

  &__input-container {
    justify-content: space-between;
  }

  &__input-menu-container {
    position: relative;
  }

  &__faux-input {
    cursor: pointer;
    display: flex;
    font-size: $form-field_input_size;
    max-width: $select_text_width;
    pointer-events: none;
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }

  &__placeholder {
    color: rgba(var(--fora_form-field_placeholder_color), 1);
  }
}
</style>
