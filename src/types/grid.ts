export interface ColProps {
  alignStart?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  alignStretch?: boolean;
  alignBaseline?: boolean;
  col?: string;
  offset?: string;
  order?: string;
}

export interface RowProps {
  justifyCenter?: boolean;
  justifyEnd?: boolean;
  justifyBetween?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  noGutter?: boolean;
  reverse?: boolean;
}
