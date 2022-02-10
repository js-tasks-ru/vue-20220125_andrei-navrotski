<template>
  <div class="toasts">
    <div v-for="(toaster, index) in toasters" :key="index" :class="`toast toast_${toaster.type}`">
      <ui-icon class="toast__icon" :icon="toaster.icon" />
      <span>{{ toaster.text }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'TheToaster',
  components: { UiIcon },
  data: () => ({
    toasters: [],
    interval: 5000,
  }),
  methods: {
    success(value) {
      this.toasters.push({
        text: value,
        icon: 'check-circle',
        type: 'success',
      });
      this.deleteToaster();
    },
    error(value) {
      this.toasters.push({
        text: value,
        icon: 'alert-circle',
        type: 'error',
      });
      this.deleteToaster();
    },
    deleteToaster() {
      setTimeout(() => this.toasters.splice(0, 1), this.interval);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
