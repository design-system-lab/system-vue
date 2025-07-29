<script lang="ts" setup>
import FdCheckbox from '../Checkbox';
import FdInputPostText from '../Form/FdInputPostText.vue';
import { filterSlots } from '../../utils';
import { CheckboxGroupProps } from '../../types';

/**
 * Checkbox Group
 * 
 * @param {string} assistiveText - Assistive text for the checkbox group
 * @param {CheckboxGroupCheckbox[]} checkboxes - An array of checkbox objects
 * @param {boolean} disabled - Whether the checkbox group is disabled
 * @param {string[]} errors - An array of error keys for active errors
 * @param {ErrorMessages} errorMessages - An object containing error messages
 * @param {string} id - The HTML id of the checkbox group
 * @param {string} label - The label for the checkbox group
 * @param {boolean} persistentAssistiveText - Whether the assistive text should persist
 */

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  checkboxes: () => [],
  disabled: false,
  errors: () => [],
  errorMessages: () => ({}),
  modelValue: () => [],
  persistentAssistiveText: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const handleChange = (value: string | undefined, checked: boolean) => {
  if (value === undefined) return;
  if (checked) {
    emit('update:modelValue', [...props.modelValue, value]);
  } else {
    emit('update:modelValue', props.modelValue.filter(v => v !== value));
  }
};
</script>

<template>
  <div class="fd-checkbox-group">
    <fieldset
      :id="id"
      class="fd-checkbox-group__fieldset"
      :disabled="disabled"
    >
      <legend
        v-if="label || $slots.label"
        class="fd-checkbox-group__legend"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </legend>
      <slot>
        <fd-checkbox
          v-for="checkbox in checkboxes"
          :key="checkbox.id"
          :disabled="disabled || checkbox.disabled"
          :errors="errors"
          :id="checkbox.id"
          :indeterminate="checkbox.indeterminate"
          :input-attrs="checkbox.inputAttrs"
          :label="checkbox.label"
          :model-value="checkbox.value ? modelValue.includes(checkbox.value) : undefined"
          :readonly="checkbox.readonly"
          :small="checkbox.small"
          :value="checkbox.value"
          @update:model-value="handleChange(checkbox.value, $event)"
        >
          <slot :name="checkbox.slotName" />
        </fd-checkbox>
      </slot>
      <fd-input-post-text
        class="fd-input-field__post-text"
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
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-checkbox-group {
  :deep(.fd-checkbox) {
    margin-bottom: 0.5rem;
  }

  &__fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  &__legend {
    font-size: $form-field_input_size;
    font-weight: $font-medium;
    margin-bottom: 0.5rem;
  }
}
</style>
