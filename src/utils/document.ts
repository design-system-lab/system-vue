import { onMounted, onUnmounted } from 'vue';

export function onDocumentClick(func: () => void) {
  onMounted(() => {
    document.addEventListener('click', func);
  });

  onUnmounted(() => {
    document.removeEventListener('click', func);
  });
}
