<template>
  <div class="fd-radio-group">
    <fieldset
      :id="id"
      class="fd-radio-group__fieldset"
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
          :disabled="radio.disabled"
          :errors="errors"
          :id="radio.id"
          :indeterminate="radio.indeterminate"
          :input-attrs="radio.inputAttrs"
          :label="radio.label"
          :modelValue="modelValue"
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
import { defineComponent, provide, PropType, watch, toRefs, shallowRef } from 'vue';
import FdRadio from '../Radio';
import FdInputPostText from '../Form/FdInputPostText.vue';
import { filterSlots } from '../../utils/components';
import { ErrorMessages } from '../../types/common';

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
      default: () => [],
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
    const poop = shallowRef(props.modelValue);

    function handleModelValue(value: string) {
      emit('update:modelValue', value);
    }

    provide('groupName', props.name);
    provide('groupModelValue', poop);
    provide('groupHandleModelValue', handleModelValue);

    watch(() => props.modelValue, (value) => {
      poop.value = value;
    });

    return {
      poop,
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
    font-size: $font-sm;
    font-weight: $font-medium;
    margin-bottom: 0.5rem;
  }

  &:deep(.fd-radio) {
    margin-bottom: 0.5rem;
  }
}

</style>
