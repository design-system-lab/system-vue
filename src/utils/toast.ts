import { nextTick, ref } from 'vue';
import { type Toast, type MappedToasts } from '../types/toast';

export function useToaster() {
  const toasts = ref<Toast[]>([]);

  function dismissToast(id: string): void {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index !== -1) {
      toasts.value[index].onLeave?.();
      toasts.value.splice(index, 1);
    }
  }

  function deployToast({
    id = Math.random().toString(36),
    offset = 0,
    position = 'bottom-right',
    props = {},
    duration = 5000,
    onAppear,
    onDismiss,
    onClickLink,
    onLeave,
  }: Toast): string {
    toasts.value = [...toasts.value, {
      id,
      offset,
      position,
      props,
      duration,
      onAppear,
      onDismiss: () => {
        onDismiss && onDismiss();
        dismissToast(id); 
      },
      onClickLink,
      onLeave,
    }];

    nextTick(() => {
      onAppear && onAppear();
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    });

    return id;
  }

  function mapToasts(toasts: Toast[]): MappedToasts {
    const toastMap: MappedToasts = {
      'top-left': [],
      'top-right': [],
      'bottom-right': [],
      'bottom-left': []
    };

    toasts.forEach(toast => {
      toastMap[toast.position || 'bottom-right'].push(toast);
    });

    return toastMap;
  }

  return {
    toasts,
    deployToast,
    dismissToast,
    mapToasts
  };
}