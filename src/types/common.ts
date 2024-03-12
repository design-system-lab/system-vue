import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export type ErrorMessages = {
  [key: string]: string; 
}

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
