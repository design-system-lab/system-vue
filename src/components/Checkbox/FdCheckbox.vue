<template>
  <div
    class="fd-checkbox"
    :class="{
      'fd-checkbox--disabled': disabled,
      'fd-checkbox--error': (errors.length || $slots['error-text']),
      'fd-checkbox--focused': hasFocus,
      'fd-checkbox--readonly': readonly,
      'fd-checkbox--small': small,
    }"
  >
    
    <label
      class="fd-checkbox__label"
      :for="id"
    >
      <fd-checkbox-base
        :disabled="disabled"
        :errors="errors"
        :id="id"
        :indeterminate="indeterminate"
        :inputAttrs="inputAttrs"
        :modelValue="modelValue"
        :readonly="readonly"
        :small="small"
        :value="value"
        @update:model-value="onChange"
      />
      <slot name="label">{{ label }}</slot>
    </label>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, shallowRef } from 'vue';
import FdCheckboxBase from './FdCheckboxBase.vue';

export default defineComponent({
  name: 'FdCheckbox',
  components: { FdCheckboxBase },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    inputAttrs: {
      type: Object as PropType<{[key: string]: string}>,
      default: () => ({}),
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const hasFocus = shallowRef(false);

    const onChange = (event: Event) => {
      emit('update:modelValue', event);
    };

    return {
      hasFocus,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-checkbox {
  &__label {
    align-items: center;
    display: flex;
    cursor: pointer;
    font-size: $form-field_input_size;
    gap: 0.5rem;
    line-height: 1.25;
  }

  &--disabled {
    cursor: not-allowed;
    color: #666;
  }

  &--error {
    color: #d9534f;
  }

  &--focused {
    color: #007bff;
  }

  &--readonly {
    cursor: not-allowed;
  }

  &--small {
    font-size: 0.875rem;
  }
}

</style>