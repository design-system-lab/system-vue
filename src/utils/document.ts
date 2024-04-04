import { onMounted, onUnmounted } from 'vue';

export function onDocumentClick(func: (e?: Event) => void) {
  onMounted(() => {
    document.addEventListener('click', func);
  });

  onUnmounted(() => {
    document.removeEventListener('click', func);
  });
}
