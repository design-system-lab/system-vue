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
          v-model="checkbox.modelValue"
          :key="checkbox.id"
          :disabled="disabled || checkbox.disabled"
          :errors="errors"
          :id="checkbox.id"
          :indeterminate="checkbox.indeterminate"
          :input-attrs="checkbox.inputAttrs"
          :label="checkbox.label"
          :readonly="checkbox.readonly"
          :small="checkbox.small"
          :value="checkbox.value"
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
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FdCheckbox from '../Checkbox';
import FdInputPostText from '../Form/FdInputPostText.vue';
import { filterSlots } from '../../utils';
import { CheckboxGroupCheckbox, ErrorMessages } from '../../types';

export default defineComponent({
  name: 'FdCheckboxGroup',
  components: { FdCheckbox, FdInputPostText },
  props: {
    assistiveText: {
      type: String,
      default: undefined,
    },
    checkboxes: {
      type: Array as PropType<CheckboxGroupCheckbox[]>,
      default: () => [],
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
    persistentAssistiveText: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { filterSlots };
  }
})
</script>

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
