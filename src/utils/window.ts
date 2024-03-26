import { onMounted, onUnmounted } from 'vue';

export function onWindowEvent(eventType: string, func: () => void) {
  onMounted(() => {
    window.addEventListener(eventType, func);
  });

  onUnmounted(() => {
    window.removeEventListener(eventType, func);
  });
}