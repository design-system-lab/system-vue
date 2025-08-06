export type GroupType = 'button' | 'checkbox' | 'chip' | 'radio' | 'default';

// TODO: Improve this type to swap between the different group types
export interface GroupProps {
  type?: GroupType;
}
