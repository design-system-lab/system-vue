<template>
  <div class="fd-radio-group">
    <fieldset
      :id="id"
      class="fd-radio-group__fieldset"
      :disabled="disabled"
    >
      <legend
        v-if="label || $slots.label"
        class="fd-radio-group__legend"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </legend>
      <slot>
        <fd-radio
          v-for="radio in radios"
          :key="radio.id"
          :disabled="disabled || radio.disabled"
          :errors="errors"
          :id="radio.id"
          :indeterminate="radio.indeterminate"
          :input-attrs="radio.inputAttrs"
          :label="radio.label"
          :model-value="modelValue"
          :readonly="radio.readonly"
          :small="radio.small"
          :value="radio.value"
          @update:modelValue="handleModelValue"
        >
          <slot :name="radio.slotName" />
        </fd-radio>
      </slot>
      <fd-input-post-text
        class="fd-radio__post-text"
        :assistive-text="assistiveText"
        :error-messages="errorMessages"
        :errors="errors"
        :id="id"
        :persistent-assistive-text="persistentAssistiveText"
      >
        <template
          v-for="(_, slotName) in filterSlots($slots, ['error-text', 'assistive-text'])"
          #[slotName]="slotData"
        >
          <slot
            v-bind="slotData"
            :name="slotName"
          />
        </template>
      </fd-input-post-text>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, PropType, watch, shallowRef } from 'vue';
import FdRadio from '../Radio';
import FdInputPostText from '../Form/FdInputPostText.vue';
import { filterSlots } from '../../utils';
import { ErrorMessages } from '../../types';

/**
 * FdRadioGroup
 * 
 * @param {string} assistiveText - The assistive text for the radio group
 * @param {boolean} disabled - Whether the radio group is disabled
 * @param {string[]} errors - Array of keys for error messages
 * @param {ErrorMessages} errorMessages - The error messages for the radio group
 * @param {string} id - The id for the radio group
 * @param {string} label - The label for the radio group
 * @param {string} modelValue - The model value for the radio group
 * @param {string} name - The name for the radio group
 * @param {boolean} persistentAssistiveText - Whether the assistive text is persistent
 * @param {typeof FdRadio[]} radios - The radios for the radio group
 */
export default defineComponent({
  name: 'FdRadioGroup',
  components: { FdRadio, FdInputPostText },
  props: {
    assistiveText: {
      type: String,
      default: null,
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
    label: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    persistentAssistiveText: {
      type: Boolean,
      default: false,
    },
    radios: {
      type: Array as PropType<typeof FdRadio[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const currentDisabled = shallowRef(props.disabled);
    const currentErrors = shallowRef(props.errors);
    const currentVal = shallowRef(props.modelValue);

    function handleModelValue(value: string) {
      emit('update:modelValue', value);
    }

    provide('groupErrors', currentErrors);
    provide('groupDisabled', currentDisabled);
    provide('groupHandleModelValue', handleModelValue);
    provide('groupModelValue', currentVal);
    provide('groupName', props.name);

    watch(() => props.disabled, (value) => {
      currentDisabled.value = value;
    });

    watch(() => props.errors, (value) => {
      currentErrors.value = value;
    });

    watch(() => props.modelValue, (value) => {
      currentVal.value = value;
    });

    return {
      currentVal,
      filterSlots,
      handleModelValue,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../styles/required';

.fd-radio-group {
  .fd-radio-group__fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  .fd-radio-group__legend {
    font-size: $form-field_label_size;
    font-weight: $font-medium;
    margin-bottom: 0.5rem;
  }

  &:deep(.fd-radio) {
    margin-bottom: 0.5rem;
  }
}

</style>
