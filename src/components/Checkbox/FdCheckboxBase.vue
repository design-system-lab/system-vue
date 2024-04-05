<template>
  <div
    class="fd-checkbox-base"
    :class="{
      'fd-checkbox-base--disabled': disabled,
      'fd-checkbox-base--error': errors.length,
      'fd-checkbox-base--selected': modelValue,
      'fd-checkbox-base--small': small,
    }"
  >
    <div
      v-show="modelValue"
      class="fd-checkbox-base__check"
    >
      <fd-icon :icon="CheckIcon" :size="small ? 16 : 20" />
    </div>
    <div
      v-show="!modelValue && indeterminate"
      class="fd-checkbox-base__indeterminate"
    >
      <fd-icon :icon="MinusIcon" :size="small ? 16 : 20" />
    </div>
    <input type="checkbox"
      class="fd-checkbox-base__input"
      :class="{
        'fd-checkbox-base__input--disabled': disabled,
        'fd-checkbox-base__input--error': errors.length,
        'fd-checkbox-base__input--selected': modelValue,
        'fd-checkbox-base__input--small': small,
      }"
      :id="id"
      :checked="modelValue"
      :indeterminate="indeterminate"
      :value="value"
      @blur="$emit('blur', $event)"
      @change="onChange"
      @focus="$emit('focus', $event)"
    />
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { CheckIcon, MinusIcon } from '@heroicons/vue/20/solid'
import FdIcon from '../Icon/FdIcon.vue';

export default defineComponent({
  name: 'FdCheckboxBase',
  components: { FdIcon },
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
      default: 'on',
    },
  },
  setup(_, { emit }) {
    function onChange(event: Event) {
      emit('update:modelValue', (event.target as HTMLInputElement).checked);
    };

    return { onChange, CheckIcon, MinusIcon };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-checkbox-base {
  align-items: center;
  border: 1px solid rgba(var(--fora_neutral-7), 1);
  border-radius: 0.25rem;
  display: inline-flex;
  flex: 0 0 auto;
  height: 1.5rem;
  justify-content: center;
  position: relative;
  width: 1.5rem;

  &__check {
    flex: 0 0 auto;
    height: 1.25rem;
    width: 1.25rem;
  }

  &__input {
    height: 100%;
    position: absolute;
    visibility: hidden;
    width: 100%;
  }
}

</style>