<template>
  <ui-input :model-value="valueDate" :type="type" @input="$emit('update:modelValue', $event.target.valueAsNumber)">
    <template v-if="$slots['right-icon']" #right-icon>
      <slot name="right-icon" />
    </template>
    <template v-if="$slots['left-icon']" #left-icon>
      <slot name="left-icon" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',
  components: { UiInput },
  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: Number,
  },
  emits: ['update:modelValue'],
  computed: {
    valueDate() {
      if (this.modelValue === undefined || this.modelValue === null) {
        return '';
      }
      const date = new Date(this.modelValue).toISOString();
      if (this.type === 'date') return date.substring(0, 10);
      if (this.type === 'datetime-local') return date.substring(0, 16);
      if (this.type === 'time') {
        return this.$attrs['step'] && this.$attrs['step'] % 60 !== 0 ? date.substring(11, 19) : date.substring(11, 16);
      }
      return '';
    },
  },
};
</script>
