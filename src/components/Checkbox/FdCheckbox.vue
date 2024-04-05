<template>
  <div class="fd-checkbox">
    <input type="checkbox" :id="id" :name="name" :value="value" :checked="checked" @change="onChange" />
    <label :for="id">
      <slot name="label">{{ label }}</slot>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
  name: 'FdCheckbox',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const checked = shallowRef(props.checked);

    const onChange = (event: Event) => {
      checked.value = (event.target as HTMLInputElement).checked;
      emit('change', checked.value);
    };

    return {
      checked,
      onChange,
    };
  },
});
</script>