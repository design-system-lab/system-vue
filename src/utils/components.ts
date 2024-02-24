import { Slots, Slot } from 'vue'

export function filterSlots(slots: Slots, permitted: string[]) {
  const filteredSlots: { [name: string]: Slot | undefined } = {};
  
  for (const name of permitted) {
    if (!(name in slots)) continue;

    filteredSlots[name] = slots[name];
  }

  return filteredSlots;
}