import React, { ReactHTML } from 'react';
import styled from 'styled-components';

import { colors } from '../themes/colors';

export enum TypographyMode {
  HEADING = 'HEADING',
  PARAGRAPH = 'PARAGRAPH',
}

interface ITypographyProps {
  children: React.ReactNode;
  as?: keyof ReactHTML;
  mode?: TypographyMode;
  className?: string;
  id?: string;
  color?: colors;
  additionalProps?: { [key: string]: string };
}

function Typography({ children, className, as = 'span', additionalProps }: ITypographyProps) {
  return React.createElement(as, { className, ...additionalProps }, children);
}

export default React.memo(styled(Typography)<ITypographyProps>`
  color: ${(props) => props.color};
  ${(props) => stylesMap[props.mode as TypographyMode]}
`);

const stylesMap = {
  [TypographyMode.HEADING]: { 'font-size': '25px', 'font-family': "'Roboto Slab', serif" },
  [TypographyMode.PARAGRAPH]: {
    'font-size': '16px',
    'font-family': "'Roboto Slab', serif",
  },
};
