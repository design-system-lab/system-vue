import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';
import FdChip from '../components/Chip';

export type ErrorMessages = Record<string, string>;

export type Icon = FunctionalComponent<HTMLAttributes & VNodeProps>;

export type TshirtSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ComponentWithSlot {
  slotName: string;
  text?: never;
}

export interface ComponentWithText {
  slotName?: never;
  text: string;
}

export type SlotOrText = ComponentWithSlot | ComponentWithText;

export type MenuDirection = 'top' | 'bottom';
export type MenuPlacement = 'attached' | 'global';

export type NodeOrNull = Node | null;

export type StopLight = 'info' | 'success' | 'warning' | 'danger';

type FdChipType = typeof FdChip;
export type ChipGroupChip = FdChipType & SlotOrText;
