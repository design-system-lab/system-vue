export type ModalAlign = 'start' | 'center' | 'end';

export interface ModalProps {
  align?: ModalAlign;
  dismissible?: boolean;
  lg?: number;
  md?: number;
  sm?: number;
  visible: boolean;
  xl?: number;
  xs?: number;
}