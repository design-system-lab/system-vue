import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export type ErrorMessages = Record<string, string>;

export type Icon = FunctionalComponent<HTMLAttributes & VNodeProps>;

export interface IconProps {
  icon: Icon;
  size: number;
}

export type TshirtSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TshirtSizeNormalized = 'sm' | 'md' | 'lg';

export interface ComponentWithSlot {
  slotName: string;
  text?: never;
}

export interface ComponentWithText {
  slotName?: never;
  text: string;
}

export type SlotOrText = ComponentWithSlot | ComponentWithText;

export type NodeOrNull = Node | null;

export type StopLight = 'info' | 'success' | 'warning' | 'danger';
