import { TshirtSize } from '../types/common';

export const getIconSize = (size: TshirtSize): number => (
  size === 'xs' || size === 'sm' ? 20 : 24
);
