import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  name: 'Calculator',
  data: () => ({
    operand1: 0,
    operand2: 0,
    operations: {
      sum: '➕',
      subtract: '➖',
      multiply: '✖',
      divide: '➗',
    },
    operation: 'sum',
  }),
  computed: {
    result() {
      switch (this.operation) {
        case 'sum':
          return this.operand1 + this.operand2;
        case 'subtract':
          return this.operand1 - this.operand2;
        case 'multiply':
          return this.operand1 * this.operand2;
        case 'divide':
          return this.operand1 / this.operand2;
        default:
          return 0;
      }
    },
  },
}).mount('#app');
